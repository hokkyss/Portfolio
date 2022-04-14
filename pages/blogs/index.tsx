import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { onSnapshot } from 'firebase/firestore'
import { Flex, useSafeLayoutEffect } from '@chakra-ui/react'

import { getBlogs } from '~/api/firebase'
import { BlogCardSkeleton, BlogCard } from '~/modules'

const Blog: NextPage = () => {
	const [loaded, setLoaded] = React.useState(false)
	const [blogs, setBlogs] = React.useState<Blog[]>([])

	useSafeLayoutEffect(() => {
		const blogQuery = getBlogs()

		const unsubscribe = onSnapshot(
			blogQuery,
			(snapshot) => {
				setLoaded(true)
				setBlogs(snapshot.docs.map((doc) => doc.data()))
			},
			() => {
				setLoaded(true)
				setBlogs([])
			}
		)

		return () => unsubscribe()
	}, [])

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
