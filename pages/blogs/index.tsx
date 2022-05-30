import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

import { /* BlogCardSkeleton, BlogCard, */ UnderDevelopment } from '~/modules'
// import { FetchBlogs } from '~/api/swr'
// import Error from '../_error'

const Blog: NextPage = () => {
	// const { blogs, blogsError, blogsLoaded } = FetchBlogs()

	return <UnderDevelopment />
	// if (blogsError) return <Error statusCode={500} />

	return (
		<React.Fragment>
			<Head>
				<title>Blogs · hokkyss</title>
				<meta name="description" content="See my content to the end!" />
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center">
				{/* {blogsLoaded && blogs ? (
					blogs.map((blog) => <BlogCard blog={blog} key={blog.uuid} />)
				) : (
					<React.Fragment>
						<BlogCardSkeleton />
						<BlogCardSkeleton />
						<BlogCardSkeleton />
					</React.Fragment>
				)} */}
			</Flex>
		</React.Fragment>
	)
}

export default Blog
