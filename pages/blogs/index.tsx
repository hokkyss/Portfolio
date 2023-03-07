import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Flex } from '@chakra-ui/react'

import { getBlogs, REVALIDATE_TIME_IN_SEC } from '~/lib/common'

import BlogCardSkeleton from '~/components/modules/BlogCard/BlogCardSkeleton'
import MainLayout from '~/components/layouts/MainLayout'

const BlogCard = dynamic(
	() => import('~/components/modules/BlogCard/BlogCard'),
	{
		loading: () => <BlogCardSkeleton />,
	}
)

const Blog: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ blogs }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Blogs · Hokki Suwanda</title>
			</Head>
			<Flex
				direction="row"
				wrap="wrap"
				justifyContent="center"
				alignItems="flex-start"
			>
				{blogs.map((blog) => (
					<BlogCard blog={blog} key={`blog-${blog.slug}`} />
				))}
			</Flex>
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<{
	blogs: Blog[]
}> = async (context) => {
	if (process.env.NODE_ENV !== 'development') {
		return {
			props: {
				blogs: [],
			},
		}
	}

	const blogs = await getBlogs()

	return {
		props: {
			blogs: blogs,
		},
		revalidate: REVALIDATE_TIME_IN_SEC,
	}
}

Blog.getLayout = function getBlogLayout() {
	return <MainLayout />
}

export default Blog
