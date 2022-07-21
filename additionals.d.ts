declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_API_URL: string
		NEXT_PUBLIC_ALLOW_LOGIN?: string
	}
}

declare type TagType =
	| 'angular'
	| 'c'
	| 'c#'
	| 'c++'
	| 'chakra'
	| 'css'
	| 'cuda'
	| 'dart'
	| 'django'
	| 'docker'
	| 'express'
	| 'fastapi'
	| 'firebase'
	| 'flask'
	| 'flutter'
	| 'github'
	| 'go'
	| 'haskell'
	| 'html'
	| 'http'
	| 'java'
	| 'javascript'
	| 'jinja'
	| 'jquery'
	| 'json'
	| 'jupyter'
	| 'kotlin'
	| 'laravel'
	| 'less'
	| 'makefile'
	| 'mariadb'
	| 'markdown'
	| 'matlab'
	| 'mongodb'
	| 'mysql'
	| 'nextjs'
	| 'nginx'
	| 'nodejs'
	| 'numpy'
	| 'php'
	| 'postgresql'
	| 'prisma'
	| 'procfile'
	| 'prolog'
	| 'python'
	| 'react'
	| 'regex'
	| 'sass'
	| 'scss'
	| 'svelte'
	| 'svg'
	| 'swift'
	| 'tailwindcss'
	| 'tex'
	| 'typescript'
	| 'ubiquity'
	| 'unity'
	| 'vue'
	| 'xml'
	| 'yaml'

type Tags = {
	id: string
	name: TagType
}

type BlogContent = { text: string } & (
	| {
			type: 'text'
	  }
	| {
			type: 'code'
			language: string
	  }
	| {
			type: 'citation'
			credit: string
	  }
	| {
			type: 'image'
			caption: string
			credit: string
	  }
)

declare type Blog = {
	id: string
	slug: string
	title: string
	subtitle: string
	tags: Tags[]
	contents: BlogContent[]
	createdAt: Date
	updatedAt: Date
}

declare type ProjectThumbnail = {
	link: string
	sequence: number
}

declare type Project = {
	id: string
	slug: string
	title: string
	description: string
	type: 'WEB' | 'MOBILE' | 'BACKEND'
	link: string
	role: string
	tags: Tags[]
	thumbnails: ProjectThumbnail[]

	createdAt: Date
	updatedAt: Date
}

declare type Skill = {
	databases: TagType[]
	frameworks: TagType[]
	languages: TagType[]
	others: TagType[]
}
