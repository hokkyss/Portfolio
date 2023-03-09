import { FirestoreDataConverter, Timestamp } from 'firebase/firestore'

export const blogConverter: FirestoreDataConverter<Blog> = {
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options)
		return {
			createdAt: (
				(data.createdAt as Timestamp)?.toDate() || new Date()
			).toISOString(),
			updatedAt: (
				(data.updatedAt as Timestamp)?.toDate() || new Date()
			).toISOString(),
			markdown: (data.markdown || '')
				.replaceAll('\\n', '\n')
				.replaceAll('\\x3C', '<')
				.replaceAll('\\x3E', '>')
				.replaceAll('\\x3D', '=')
				.replaceAll('\\x26', '&'),
			slug: data.slug || snapshot.id || '',
			subtitle: data.subtitle || '',
			tags: data.tags || '',
			title: data.title || '',
			writerUid: data.writerUid || '',
		}
	},
	toFirestore(modelObject) {
		return {
			createdAt: Timestamp.fromDate(
				new Date((modelObject.createdAt as any) || Date.now())
			),
			updatedAt: Timestamp.fromDate(new Date()),
			markdown: ((modelObject.markdown as string) || '')
				.replaceAll('\n', '\\n')
				.replaceAll('<', '\\x3C')
				.replaceAll('>', '\\x3E')
				.replaceAll('=', '\\x3D')
				.replaceAll('&', '\\x26'),
			slug: modelObject.slug || '',
			subtitle: modelObject.subtitle || '',
			tags: modelObject.tags || '',
			title: modelObject.title || '',
			writerUid: modelObject.writerUid || '',
		}
	},
}
