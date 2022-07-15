import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

import { UnderDevelopment } from '~/modules'

const Blog: NextPage = () => {
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

export default Blog
