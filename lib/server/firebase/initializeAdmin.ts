import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'

export function initializeFirebaseAdmin() {
	if (getApps().length > 0) return getApp()

	return initializeApp({
		credential: cert({
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		}),
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		// serviceAccountId: '',
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	})
}
