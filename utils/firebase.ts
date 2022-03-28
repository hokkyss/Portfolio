import { initializeApp } from 'firebase/app'
import {
	DocumentData,
	FirestoreDataConverter,
	FirestoreErrorCode,
} from 'firebase/firestore'

import firebaseConfig from 'firebase-config.json'

export const app = initializeApp(firebaseConfig)

export const convertFirestoreError = (error: FirestoreErrorCode) => {
	if (
		error === 'cancelled' ||
		error === 'aborted' ||
		error === 'already-exists' ||
		error === 'out-of-range' ||
		error === 'invalid-argument'
	)
		return 400

	if (error === 'failed-precondition') return 412

	if (error === 'internal' || error === 'unknown') return 500

	if (error === 'not-found' || error === 'unavailable') return 404

	if (error === 'permission-denied') return 403

	if (error === 'unauthenticated') return 401

	if (error === 'unimplemented') return 503

	if (error === 'deadline-exceeded') return 504

	if (error === 'resource-exhausted') return 507

	if (error === 'data-loss') return 410
}

export const blogConverter: FirestoreDataConverter<Blog> = {
	toFirestore: (blog: Blog): DocumentData => ({ blog }),
	fromFirestore: (snapshot): Blog => snapshot.data() as Blog,
}
