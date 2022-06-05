import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import {
	DocumentData,
	FirestoreDataConverter,
	getFirestore,
} from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getPerformance } from 'firebase/performance'

import firebaseConfig from 'firebase-config.json'

export const firebaseApp = initializeApp(firebaseConfig)

export const makeConverter = <
	T extends Record<string, unknown>
>(): FirestoreDataConverter<T> => ({
	toFirestore: (data: T): DocumentData => ({ ...data }),
	fromFirestore: (snapshot): T => snapshot.data() as T,
})

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const database = getDatabase(firebaseApp)
const analytics =
	typeof window === 'undefined' ? null : getAnalytics(firebaseApp)
const storage = getStorage(firebaseApp)
const performance =
	typeof window === 'undefined' ? null : getPerformance(firebaseApp)
