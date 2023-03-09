import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { accessTokenConverter } from '../firebase/accessTokenConverter'
import { initializeFirebaseClient } from '../firebase/initializeClient'

export const getCustomToken = async (accessToken: string) => {
	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)

	const documentRef = doc(firestore, 'accessTokens', accessToken).withConverter(
		accessTokenConverter
	)
	const accessTokenSnapshot = await getDoc(documentRef)

	if (!accessTokenSnapshot.exists() || accessTokenSnapshot.data().used) {
		return ''
	}

	const customToken = accessTokenSnapshot.data().customToken
	await setDoc(documentRef, { used: true, customToken: '' }, { merge: true })

	return customToken
}
