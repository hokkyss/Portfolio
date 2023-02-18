import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'

import { UnderDevelopment } from '~/components/modules'
import { getBlogs, getOneBlog } from '~/lib/common'
import { Time } from '~/constants/time'

const BlogContent: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = () => {
	return <UnderDevelopment />
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (
	context
) => {
	if (process.env.NODE_ENV !== 'development') {
		return {
			fallback: true,
			paths: [],
		}
	}

	const blogs = await getBlogs()

	return {
		fallback: true,
		paths: blogs.map((blog) => ({ params: { slug: blog.slug } })),
	}
}

export const getStaticProps: GetStaticProps<
	{
		blog: Blog
	},
	{ slug: string }
> = async (context) => {
	if (!context.params || !context.params.slug) {
		return {
			notFound: true,
		}
	}

	const blog = await getOneBlog(context.params.slug)
	if (!blog) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			blog: blog,
		},
		revalidate: 12 * Time.HOUR, // 12 hours
	}
}

export default BlogContent
