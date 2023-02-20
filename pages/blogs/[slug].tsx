import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'

import { UnderDevelopment } from '~/components/modules'
import { getBlogs, getOneBlog, REVALIDATE_TIME_IN_SEC } from '~/lib/common'

const BlogContent: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	blog,
}) => {
	return <UnderDevelopment />
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (
	context
) => {
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
	{
		slug: string
	}
> = async (context) => {
	if (!context.params) {
		return {
			notFound: true,
		}
	}

	const blog = await getOneBlog(context.params.slug)
	if (!blog) {
		return {
			notFound: true,
			revalidate: REVALIDATE_TIME_IN_SEC,
		}
	}

	return {
		props: {
			blog: blog,
		},
		revalidate: REVALIDATE_TIME_IN_SEC,
	}
}

export default BlogContent
