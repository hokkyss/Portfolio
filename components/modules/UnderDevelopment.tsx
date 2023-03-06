import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'

import { underDevelopment } from '~/lib/common'
import BlogCardSkeleton from './BlogCard/BlogCardSkeleton'

const BlogCard = dynamic(
	() => import('~/components/modules/BlogCard/BlogCard'),
	{
		loading: () => <BlogCardSkeleton />,
	}
)

const UnderDevelopment = React.memo(function UnderDevelopment() {
	return (
		<React.Fragment>
			<Head>
				<title>Under Development · Hokki Suwanda</title>
			</Head>
			<Flex
				direction="row"
				wrap="wrap"
				justifyContent="center"
				alignItems="flex-start"
			>
				<BlogCard blog={underDevelopment} />
			</Flex>
		</React.Fragment>
	)
})

export default UnderDevelopment
