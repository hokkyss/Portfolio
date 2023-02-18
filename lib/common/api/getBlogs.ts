import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from 'firebase/firestore'
import { blogConverter, initializeFirebaseClient } from '~/utils/common'

export const getBlogs = async function () {
	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)

	const collectionRef = collection(firestore, 'blogs').withConverter(
		blogConverter
	)
	const q = query(collectionRef, orderBy('createdAt', 'desc'))
	try {
		const blogDocs = await getDocs(q)
		return blogDocs.docs.map((snapshot) => snapshot.data())
	} catch {
		return <Blog[]>[]
	}
}
