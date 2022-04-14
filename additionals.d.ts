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
	| 'unity'
	| 'vue'
	| 'xml'
	| 'yaml'

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

declare type Skill = {
	databases: TagType[]
	frameworks: TagType[]
	languages: TagType[]
}
