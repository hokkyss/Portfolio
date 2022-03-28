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
	contents: BlogContent[]
}
