import * as React from 'react'
import {
	getFirestore,
	collection as getCollection,
	doc,
	onSnapshot,
	FirestoreError,
} from 'firebase/firestore'

import { app, makeConverter } from '~/utils/firebase'
import { useSafeLayoutEffect } from '@chakra-ui/react'

const firestore = getFirestore(app)

export const useSkills = () => {
	const [data, setData] = React.useState<Skill>({
		databases: [],
		frameworks: [],
		languages: [],
	})
	const [loaded, setLoaded] = React.useState(false)
	const [error, setError] = React.useState<FirestoreError>()

	useSafeLayoutEffect(() => {
		const collection = getCollection(firestore, 'skills').withConverter(
			makeConverter<Skill>()
		)

		const document = doc(collection, 'me')

		const unsubscribe = onSnapshot(
			document,
			(snapshot) => {
				setLoaded(true)
				setData(
					snapshot.data() ?? {
						databases: [],
						frameworks: [],
						languages: [],
					}
				)
				setError(undefined)
			},
			(e) => {
				setLoaded(true)
				setData({
					databases: [],
					frameworks: [],
					languages: [],
				})
				setError(e)
			}
		)

		return () => unsubscribe()
	}, [])

	return {
		skills: data,
		loaded,
		error,
	}
}
