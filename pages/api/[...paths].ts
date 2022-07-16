import { NextApiHandler } from 'next'
import admin from 'firebase-admin'

import { canLogin } from '~/utils/canLogin'

type ApiResponse = {
	detail: string
}

const unauthorizedCodes: admin.FirebaseError['code'][] = [
	'auth/invalid-user-token',
	'auth/user-token-expired',
	'auth/user-disabled',
	'auth/id-token-expired',
	'auth/argument-error',
]

const handler: NextApiHandler<ApiResponse> = async (req, res) => {
	if (!canLogin()) {
		return res.status(404).json({ detail: 'Not Found' })
	}
	if (req.method !== 'POST') {
		return res.status(404).json({ detail: 'Not Found' })
	}

	const paths = req.query.paths
	if (!paths || typeof paths === 'string') {
		return res.status(404).json({ detail: 'Not Found' })
	}

	const authorization = req.headers.authorization
	if (!authorization) {
		return res.status(401).json({ detail: 'Unauthorized' })
	}
	const [bearer, idToken, ...rest] = authorization.split(' ')
	if (!bearer || bearer !== 'Bearer' || !idToken || rest.length !== 0) {
		return res.status(401).json({ detail: 'Unauthorized' })
	}

	const app = admin.initializeApp({
		credential: admin.credential.cert({
			clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
		}),
	})

	try {
		const decodedIdToken = await app.auth().verifyIdToken(idToken)
		const me = await app.auth().getUserByEmail('hokkyss2@gmail.com')
		if (
			decodedIdToken.uid !== me.uid ||
			decodedIdToken.email !== me.email ||
			decodedIdToken.email_verified !== me.emailVerified
		) {
			return res.status(403).json({ detail: 'Forbidden' })
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		const code = e.code
		if (unauthorizedCodes.includes(code)) {
			return res.status(401).json({ detail: 'Unauthorized' })
		}
		return res.status(500).json({ detail: 'Internal Server Error' })
	}

	const revalidating = '/' + paths.join('/')
	try {
		await res.revalidate(revalidating)
		return res.status(200).json({ detail: 'OK' })
	} catch {
		return res.status(500).json({ detail: 'Internal Server Error' })
	}
}

export default handler
