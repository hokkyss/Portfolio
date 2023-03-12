import { getFirestore } from 'firebase-admin/firestore'
import { User } from 'next-firebase-session-auth'

import { blogConverter } from '../firebase/blogConverter'
import { initializeFirebaseAdmin } from '../firebase/initializeAdmin'

export const createBlog = async (
	user: User,
	markdown: string,
	slug: string,
	subtitle: string,
	tags: string[],
	title: string
) => {
	const admin = initializeFirebaseAdmin()
	const firestore = getFirestore(admin)

	const doc = firestore
		.collection('blogs')
		.doc(slug)
		.withConverter(blogConverter)
	const snapshot = await doc.get()

	try {
		if (snapshot.exists) {
			throw new Error('Blog already exists')
		}

		await doc.set({
			createdAt: new Date().toISOString(),
			markdown: markdown,
			slug,
			subtitle,
			tags,
			title,
			writerUid: user.uid,
			updatedAt: new Date().toISOString(), // actually not needed, but well
		})

		const data = snapshot.data()

		if (!data) {
			throw new Error('')
		}
		return data
	} catch (e) {
		throw new Error((e as Error).message || 'Internal Server Error')
	}
}
