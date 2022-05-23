import * as React from 'react'
import {
	getFirestore,
	collection as getCollection,
	doc,
	FirestoreError,
	onSnapshot,
} from 'firebase/firestore'

import { app, makeConverter } from '~/utils/firebase'
import { useSafeLayoutEffect } from '@chakra-ui/react'

const firestore = getFirestore(app)

export const useBlog = (uuid: string) => {
	const [data, setData] = React.useState<Blog>()
	const [loaded, setLoaded] = React.useState(false)
	const [error, setError] = React.useState<FirestoreError>()

	useSafeLayoutEffect(() => {
		if (uuid) {
			const collection = getCollection(firestore, 'blogs').withConverter(
				makeConverter<Blog>()
			)
			const document = doc(collection, uuid)

			const unsubscribe = onSnapshot(
				document,
				(snapshot) => {
					setLoaded(true)
					setData(snapshot.data())
					setError(undefined)
				},
				(e) => {
					setLoaded(true)
					setData(undefined)
					setError(e)
				}
			)

			return () => unsubscribe()
		}
	}, [uuid])

	return { blog: data, loaded, error }
}
