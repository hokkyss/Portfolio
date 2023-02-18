declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_API_URL: string
		NEXT_PUBLIC_ALLOW_LOGIN?: string
	}
}

declare type Blog = {
	slug: string
	title: string
	subtitle: string
	tags: string[]
	markdown: string
	createdAt: Date
	updatedAt: Date
	writerUid: string
}

declare type Project = {
	slug: string
	title: string
	subtitle: string
	markdown: string
	link: string
	tags: string[]
	thumbnails: string[]

	createdAt: Date
	updatedAt: Date
}

declare type Skill = {
	databases: TagType[]
	frameworks: TagType[]
	languages: TagType[]
	others: TagType[]
}
