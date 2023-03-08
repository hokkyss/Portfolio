import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import { getBlogs, getOneBlog, REVALIDATE_TIME_IN_SEC } from '~/lib/common'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Loading } from '~/components/elements'
import MainLayout from '~/components/layouts/MainLayout'
import Markdown from '~/components/modules/Markdown/Markdown'

const BlogContent: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ blog }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <Loading />
	}

	return (
		<Box w="container.lg" mx="auto">
			<Markdown>{blog.markdown}</Markdown>
		</Box>
	)
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

BlogContent.getLayout = function getBlogContentLayout() {
	return <MainLayout />
}

export default BlogContent
