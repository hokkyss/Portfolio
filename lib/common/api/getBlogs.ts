import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from 'firebase/firestore'
import { blogConverter, initializeFirebaseClient } from '~/lib/common'

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
		return <Blog[]>[
			{
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				subtitle: 'Something happened when fetching data',
				title: 'Error',
				writerUid: '',
				tags: ['nextjs'],
				markdown: '',
				slug: 'error',
			},
		]
	}
}
