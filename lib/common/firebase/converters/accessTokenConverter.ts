import { FirestoreDataConverter } from 'firebase/firestore'

export const accessTokenConverter: FirestoreDataConverter<AccessToken> = {
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options)

		return {
			customToken: data.customToken,
			used: data.used,
		}
	},
	toFirestore(modelObject) {
		return {
			customToken: modelObject.used ? '' : modelObject.customToken,
			used: modelObject.used,
		}
	},
}
