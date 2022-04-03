declare type TagType =
	| 'angular'
	| 'c#'
	| 'css'
	| 'dart'
	| 'django'
	| 'docker'
	| 'fastapi'
	| 'firebase'
	| 'github'
	| 'haskell'
	| 'html'
	| 'java'
	| 'javascript'
	| 'jinja'
	| 'jquery'
	| 'json'
	| 'jupyter'
	| 'kotlin'
	| 'laravel'
	| 'less'
	| 'markdown'
	| 'mysql'
	| 'nextjs'
	| 'nginx'
	| 'nodejs'
	| 'numpy'
	| 'php'
	| 'prisma'
	| 'procfile'
	| 'python'
	| 'react'
	| 'regex'
	| 'sass'
	| 'svelte'
	| 'svg'
	| 'swift'
	| 'tex'
	| 'typescript'
	| 'unity'
	| 'vue'

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
	uuid: string
	title: string
	subtitle: string
	createdAt: string
	tags: TagType[]
	contents: BlogContent[]
}
