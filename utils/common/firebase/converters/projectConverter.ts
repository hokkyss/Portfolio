import { FirestoreDataConverter, Timestamp } from 'firebase/firestore'

export const projectConverter: FirestoreDataConverter<Project> = {
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options)
		return {
			createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
			updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
			markdown: data.markdown || '',
			slug: data.slug || '',
			subtitle: data.subtitle || '',
			tags: data.tags || [],
			title: data.title || '',
			writerUid: data.writerUid || '',
			link: data.link || '',
			thumbnails: data.thumbnails || [],
		}
	},
	toFirestore(modelObject) {
		return {
			createdAt: Timestamp.fromDate(
				(modelObject.createdAt as Date) || new Date()
			),
			updatedAt: Timestamp.fromDate(
				(modelObject.updatedAt as Date) || new Date()
			),
			markdown: modelObject.markdown || '',
			slug: modelObject.slug || '',
			subtitle: modelObject.subtitle || '',
			tags: modelObject.tags || '',
			title: modelObject.title || '',
			link: modelObject.link || '',
			thumbnails: modelObject.thumbnails || [],
		}
	},
}
