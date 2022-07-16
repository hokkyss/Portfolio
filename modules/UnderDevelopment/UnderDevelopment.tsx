import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import * as React from 'react'

import { underDevelopment } from '~/constants/underDevelopment'
import { BlogCard } from '~/modules'

export const UnderDevelopment = React.memo(function UnderDevelopment() {
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
