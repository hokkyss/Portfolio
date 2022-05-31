import { initializeApp } from 'firebase/app'
import { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

import firebaseConfig from 'firebase-config.json'

export const firebaseApp = initializeApp(firebaseConfig)

export const makeConverter = <
	T extends Record<string, unknown>
>(): FirestoreDataConverter<T> => ({
	toFirestore: (data: T): DocumentData => ({ ...data }),
	fromFirestore: (snapshot): T => snapshot.data() as T,
})
