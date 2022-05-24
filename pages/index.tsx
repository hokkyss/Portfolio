import * as React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
	Avatar,
	Center,
	CenterProps,
	Flex,
	Heading,
	Image as ChakraImage,
	ImageProps,
	Spacer,
	Text,
} from '@chakra-ui/react'

import { useBreakpointValue } from '~/hooks'
import { ContactCard, UnderDevelopment } from '~/modules'

const Home: NextPage = () => {
	const value = useBreakpointValue<ImageProps['boxSize']>({
		base: '40',
		sm: '40',
		md: '48',
		lg: '3xs',
	})
	const flexDirection = useBreakpointValue<CenterProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})

	return <UnderDevelopment />

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss · Hokki Suwanda</title>
				<meta name="description" content="Generated by create next app" />
			</Head>
			<Center
				width="full"
				height="full"
				flexDirection={flexDirection}
				justifyContent="center"
				alignItems="center"
			>
				<ChakraImage
					borderRadius="full"
					bg="transparent"
					src="me.png"
					title="Hokki Suwanda"
					boxSize={value}
					fallback={<Avatar margin="4" width={value} height={value} />}
					margin="4"
				/>
				<Flex flexDirection="column">
					<Heading as="h2" fontSize="4xl">
						I&apos;m Hokki Suwanda
					</Heading>
					<Text fontSize="2xl">A software engineer</Text>
					<Text>Bandung Institute of Technology</Text>
				</Flex>
			</Center>
		</React.Fragment>
	)
}

export default Home
