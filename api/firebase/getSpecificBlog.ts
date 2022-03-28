import {
	getFirestore,
	collection as getCollection,
	doc,
} from 'firebase/firestore'

import { app, blogConverter } from '~/utils/firebase'

const firestore = getFirestore(app)

export const getSpecificBlogs = (uuid: string) => {
	const collection = getCollection(firestore, 'blogs').withConverter(
		blogConverter
	)
	const document = doc(collection, uuid)

	return document
}
