import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from 'firebase/firestore'

import { initializeFirebaseClient, projectConverter } from '~/utils/common'

export const getProjects = async function () {
	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)

	const collectionRef = collection(firestore, 'projects').withConverter(
		projectConverter
	)
	const q = query(collectionRef, orderBy('createdAt', 'desc'))
	try {
		const projectDocs = await getDocs(q)
		return projectDocs.docs.map((snapshot) => snapshot.data())
	} catch {
		return <Project[]>[]
	}
}
