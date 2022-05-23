import * as React from 'react'
import {
	getFirestore,
	collection as getCollection,
	orderBy,
	query,
	onSnapshot,
	FirestoreError,
} from 'firebase/firestore'

import { app, makeConverter } from '~/utils/firebase'
import { useSafeLayoutEffect } from '@chakra-ui/react'

const firestore = getFirestore(app)

export const useBlogs = () => {
	const [data, setData] = React.useState<Blog[]>([])
	const [loaded, setLoaded] = React.useState(false)
	const [error, setError] = React.useState<FirestoreError>()

	useSafeLayoutEffect(() => {
		const collection = getCollection(firestore, 'blogs').withConverter(
			makeConverter<Blog>()
		)

		const blogQuery = query(collection, orderBy('createdAt', 'desc'))

		const unsubscribe = onSnapshot(
			blogQuery,
			(snapshot) => {
				setLoaded(true)
				setData(snapshot.docs.map((doc) => doc.data()))
				setError(undefined)
			},
			(e) => {
				setLoaded(true)
				setData([])
				setError(e)
			}
		)

		return () => unsubscribe()
	}, [])

	return {
		blogs: data,
		loaded,
		error,
	}
}
