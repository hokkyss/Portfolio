import {
	getFirestore,
	collection as getCollection,
	orderBy,
	query,
} from 'firebase/firestore'

import { app, blogConverter } from '~/utils/firebase'

const firestore = getFirestore(app)

export const getBlogs = () => {
	const collection = getCollection(firestore, 'blogs').withConverter(
		blogConverter
	)

	const q = query(collection, orderBy('createdAt', 'desc'))

	return q
}
