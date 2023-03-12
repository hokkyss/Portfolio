import { NextApiHandler } from 'next'
import { verifySession } from 'next-firebase-session-auth'

import { deleteBlog, editBlog, initializeFirebaseAdmin } from '~/lib/server'

const adminApp = initializeFirebaseAdmin()

const handler: NextApiHandler<Blog | { detail: string }> = async function (
	req,
	res
) {
	const userSession = await verifySession(req, res, adminApp)

	if (!userSession.isSignedIn) {
		return res.status(401).json({ detail: 'Unauthorized' })
	}

	const oldSlug = req.query.slug
	if (typeof oldSlug !== 'string') {
		return res.status(400).json({ detail: 'Bad Request' })
	}

	try {
		if (req.method === 'PUT' || req.method === 'PATCH') {
			const { markdown, slug, subtitle, tags, title } = req.body
			const [blog] = await Promise.all([
				editBlog(
					userSession.user,
					markdown,
					slug,
					oldSlug,
					subtitle,
					tags,
					title
				),
				res.revalidate(`/blogs/${slug}`),
				res.revalidate(`/blogs/${oldSlug}`),
			])
			return res.status(200).json(blog)
		}

		if (req.method === 'DELETE') {
			await Promise.all([
				deleteBlog(oldSlug),
				res.revalidate(`/blogs/${oldSlug}`),
			])
			return res.status(200).json({ detail: 'Deleted.' })
		}
	} catch {
		return res.status(500).json({ detail: 'Internal Server Error' })
	}
	return res.redirect('/api/not-found')
}

export default handler
