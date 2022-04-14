import {
	getFirestore,
	collection as getCollection,
	doc,
} from 'firebase/firestore'

import { app, skillConverter } from '~/utils/firebase'

const firestore = getFirestore(app)

export const getSkills = () => {
	const collection = getCollection(firestore, 'skills').withConverter(
		skillConverter
	)

	const document = doc(collection, 'me')

	return document
}
