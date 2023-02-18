import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { initializeFirebaseClient, projectConverter } from '~/utils/common'

export const getOneProject = async function (slug: string) {
	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)

	const documentRef = doc(firestore, 'projects', slug).withConverter(
		projectConverter
	)
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
