import { getFirestore } from 'firebase-admin/firestore'
import { NextApiHandler } from 'next'
import { verifySession } from 'next-firebase-session-auth'
import { blogConverter, initializeFirebaseAdmin } from '~/lib/server'

const adminApp = initializeFirebaseAdmin()

const handler: NextApiHandler<Blog | { detail: string }> = async function (
	req,
	res
) {
	if (req.method !== 'POST') {
		return res.redirect('/api/not-found')
	}

	const userSession = await verifySession(req, res, adminApp)

	if (!userSession.isSignedIn) {
		return res.status(401).json({ detail: 'Unauthorized' })
	}

	const { markdown, slug, oldSlug, subtitle, tags, title } = req.body

	const firestore = getFirestore(adminApp)

	const newDoc = firestore
		.collection('blogs')
		.doc(slug)
		.withConverter(blogConverter)

	const doc = firestore
		.collection('blogs')
		.doc(oldSlug)
		.withConverter(blogConverter)

	try {
		await Promise.all([
			// slug is updated, delete old blog instead
			newDoc.path !== doc.path ? doc.delete() : null,
			newDoc.set({
				createdAt: new Date().toISOString(),
				markdown: markdown,
				slug,
				subtitle,
				tags,
				title,
				writerUid: userSession.user.uid,
				updatedAt: new Date().toISOString(), // actually not needed, but well
			}),
		])

		const blogSnapshot = await newDoc.get()
		const data = blogSnapshot.data()
		if (data) {
			return res.status(201).json(data)
		}
		throw new Error('')
	} catch {
		return res.status(500).json({ detail: 'Internal Server Error' })
	}
}

export default handler
