import { FirestoreDataConverter, Timestamp } from 'firebase/firestore'

export const projectConverter: FirestoreDataConverter<Project> = {
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options)
		return {
			createdAt: (
				(data.createdAt as Timestamp)?.toDate() || new Date()
			).toISOString(),
			updatedAt: (
				(data.updatedAt as Timestamp)?.toDate() || new Date()
			).toISOString(),
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
				new Date((modelObject.createdAt as any) || Date.now())
			),
			updatedAt: Timestamp.fromDate(
				new Date((modelObject.updatedAt as any) || Date.now())
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