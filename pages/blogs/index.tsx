import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

import { UnderDevelopment } from '~/components/modules'
import { getBlogs } from '~/lib/common'
import { Time } from '~/constants/time'

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	blogs,
}) => {
	return <UnderDevelopment />

	return (
		<React.Fragment>
			<Head>
				<title>Blogs · Hokki Suwanda</title>
				<meta name="description" content="See my content to the end!" />
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center"></Flex>
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
		revalidate: 12 * Time.HOUR, // 10 seconds or 12 hours
	}
}

export default Blog
