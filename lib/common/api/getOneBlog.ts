import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { blogConverter, initializeFirebaseClient } from '~/lib/common'

export const getOneBlog = async function (slug: string) {
	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)

	const documentRef = doc(firestore, 'blogs', slug).withConverter(blogConverter)
	try {
		const document = await getDoc(documentRef)

		if (!document.exists()) {
			throw new Error('Blog does not exist!')
		}
		return document.data()
	} catch {
		return null
	}
}
