import { NextApiHandler } from 'next'
import { verifySession } from 'next-firebase-session-auth'

import { createBlog, initializeFirebaseAdmin } from '~/lib/server'

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

	try {
		const { markdown, slug, subtitle, tags, title } = req.body
		const [blog] = await Promise.all([
			createBlog(userSession.user, markdown, slug, subtitle, tags, title),
			res.revalidate(`/blogs/${slug}`),
		])
		return res.status(201).json(blog)
	} catch (e: any) {
		return res
			.status(500)
			.json({ detail: e?.message || 'Internal Server Error' })
	}
}

export default handler
