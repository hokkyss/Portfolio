import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'

import { UnderDevelopment } from '~/components/modules'
import { getAllBlogs, getOneBlog } from '~/lib'
import { Time } from '~/constants/time'

const BlogContent: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = () => {
	return <UnderDevelopment />
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async (
	context
) => {
	if (process.env.NODE_ENV !== 'development') {
		return {
			fallback: true,
			paths: [],
		}
	}

	const blogs = await getAllBlogs()

	return {
		fallback: true,
		paths: blogs
			.map((blog) => ({ params: { id: blog.id } }))
			.concat(blogs.map((blog) => ({ params: { id: blog.slug } }))),
	}
}

export const getStaticProps: GetStaticProps<
	{
		blog: Blog
	},
	{ id: string }
> = async (context) => {
	if (!context.params || !context.params.id) {
		return {
			notFound: true,
		}
	}

	const blog = await getOneBlog(context.params.id)

	return {
		props: {
			blog: blog,
		},
		revalidate: 12 * Time.HOUR, // 12 hours
	}
}

export default BlogContent
