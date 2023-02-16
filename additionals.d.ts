declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_API_URL: string
		NEXT_PUBLIC_ALLOW_LOGIN?: string
	}
}

type Tags = {
	id: string
	name: string
}

declare type Blog = {
	id: string
	slug: string
	title: string
	subtitle: string
	tags: Tags[]
	markdown: string
	createdAt: Date
	updatedAt: Date
}

declare type Project = {
	id: string
	slug: string
	title: string
	markdown: string
	type: 'WEB' | 'MOBILE' | 'BACKEND'
	link: string
	role: string
	tags: Tags[]
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
