declare type GetLayout = (page: React.ReactElement) => React.ReactNode

// eslint-disable-next-line @typescript-eslint/ban-types
declare type NextPageWithLayout<P = {}, IP = P> = import('next').NextPage<
	P,
	IP
> & {
	getLayout?: GetLayout
}

declare type AppPropsWithLayout = import('next/app').AppProps & {
	Component: NextPageWithLayout
}

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
	/**
	 * ISOString format
	 */
	createdAt: string
	/**
	 * ISOString format
	 */
	updatedAt: string
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

	/**
	 * ISOString format
	 */
	createdAt: string
	/**
	 * ISOString format
	 */
	updatedAt: string
}

declare type Skill = {
	databases: TagType[]
	frameworks: TagType[]
	languages: TagType[]
	others: TagType[]
}

declare type AccessToken = {
	customToken: string
	used: boolean
}
