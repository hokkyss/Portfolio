import { getFirestore } from 'firebase-admin/firestore'
import { User } from 'next-firebase-session-auth'

import { blogConverter } from '../firebase/blogConverter'
import { initializeFirebaseAdmin } from '../firebase/initializeAdmin'

export const editBlog = async (
	user: User,
	markdown: string,
	slug: string,
	oldSlug: string,
	subtitle: string,
	tags: string[],
	title: string
) => {
	const adminApp = initializeFirebaseAdmin()
	const collection = getFirestore(adminApp)
		.collection('blogs')
		.withConverter(blogConverter)
	const docRef = collection.doc(oldSlug)

	try {
		if (oldSlug !== slug) {
			const newDocRef = collection.doc(slug)
			const oldData = (await docRef.get()).data()

			if (!oldData) {
				throw new Error('Not Found')
			}

			await Promise.all([
				docRef.delete(),
				newDocRef.set({
					...oldData,
					subtitle,
					tags,
					title,
					markdown,
				}),
			])
			const blog = (await newDocRef.get()).data()
			if (!blog) {
				throw new Error('')
			}

			return blog
		}

		// oldSlug === slug
		await docRef.update({
			markdown: markdown,
			subtitle: subtitle,
			tags: tags,
			title: title,
			writerUid: user.uid,
		})
		const blog = (await docRef.get()).data()
		if (!blog) {
			throw new Error('')
		}
		return blog
	} catch (e) {
		throw new Error((e as Error).message || 'Internal Server Error')
	}
}
