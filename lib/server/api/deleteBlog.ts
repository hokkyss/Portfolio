import { getFirestore } from 'firebase-admin/firestore'

import { blogConverter } from '../firebase/blogConverter'
import { initializeFirebaseAdmin } from '../firebase/initializeAdmin'

export const deleteBlog = async (slug: string) => {
	const admin = initializeFirebaseAdmin()
	const firestore = getFirestore(admin)

	const doc = firestore
		.collection('blogs')
		.doc(slug)
		.withConverter(blogConverter)
	const snapshot = await doc.get()

	try {
		if (!snapshot.exists) {
			throw new Error('Blog does not exist')
		}

		await doc.delete()

		return
	} catch (e) {
		throw new Error((e as Error).message || 'Internal Server Error')
	}
}
