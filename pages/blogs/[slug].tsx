import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import { getBlogs, getOneBlog, REVALIDATE_TIME_IN_SEC } from '~/lib/common'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Loading } from '~/components/elements'

import BlogCardSkeleton from '~/components/modules/BlogCard/BlogCardSkeleton'
import MainLayout from '~/components/layouts/MainLayout'
const Markdown = dynamic(
	() => import('~/components/modules/Markdown/Markdown'),
	{ loading: () => <BlogCardSkeleton /> }
)

const BlogContent: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ blog }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <Loading />
	}

	return (
		<Flex>
			<Markdown>{blog.markdown}</Markdown>
		</Flex>
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
