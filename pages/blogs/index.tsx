import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

import { useBlogs } from '~/api/firebase'
import { BlogCardSkeleton, BlogCard } from '~/modules'

const Blog: NextPage = () => {
	const { blogs, loaded } = useBlogs()

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss - Blogs</title>
				<meta name="description" content="See my content to the end!" />
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center">
				{loaded ? (
					blogs.map((blog) => <BlogCard blog={blog} key={blog.uuid} />)
				) : (
					<React.Fragment>
						<BlogCardSkeleton />
						<BlogCardSkeleton />
						<BlogCardSkeleton />
					</React.Fragment>
				)}
			</Flex>
		</React.Fragment>
	)
}

export default Blog
