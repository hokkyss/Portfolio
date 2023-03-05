import * as React from 'react'
import Head from 'next/head'
import {
	CenterProps,
	ImageProps,
	keyframes,
	useSafeLayoutEffect,
	FlexProps,
	TextProps,
	Box,
	Center,
	Flex,
	Icon,
	Img as ChakraImage,
	Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoIosHand } from 'react-icons/io'

import { useBreakpointValue } from '~/hooks'
import { MainLayout } from '~/components/layouts'

const texts = ['software engineer', 'student', 'motivated learner']

const slide = keyframes`
  0% { transform: translate(-400px); }
	30% { transform: translate(0px); }
	70% { transform: translate(0px); }
  100% { transform: translate(-400px); }
`

const slideAnimation = `${slide} 2.5s ease-in-out 0.25s infinite`

const wave = keyframes`
	0% { transform: rotate(-15deg); }
	50% { transform: rotate(15deg); }
	100% { transform: rotate(-15deg); }
`

const waveAnimation = `${wave} 1s ease-in-out infinite`

const Home: NextPageWithLayout = () => {
	const [num, setNum] = React.useState(0)

	const boxSize = useBreakpointValue<ImageProps['boxSize']>({
		base: '40',
		sm: '40',
		md: '48',
		lg: '3xs',
	})
	const flexDirection = useBreakpointValue<CenterProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})
	const alignItems = useBreakpointValue<FlexProps['alignItems']>({
		base: 'center',
		md: 'start',
	})
	const textAlign = useBreakpointValue<TextProps['textAlign']>({
		base: 'center',
		md: 'start',
	})

	useSafeLayoutEffect(() => {
		const interval = setInterval(function () {
			setNum((n) => (n + 1) % texts.length)
		}, 2500)

		return () => clearInterval(interval)
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss · Hokki Suwanda</title>
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
					boxSize={boxSize}
					// fallback={<Avatar margin="4" width={boxSize} height={boxSize} />}
					margin="4"
				/>
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems={alignItems}
				>
					<Text
						as="h2"
						fontSize="3xl"
						display="flex"
						fontWeight="600"
						alignItems="center"
					>
						Hello! <Icon as={IoIosHand} animation={waveAnimation} />
					</Text>
					<Text as="h2" fontSize="3xl" fontWeight="600">
						I&apos;m Hokki Suwanda, a
					</Text>
					<Box as="div" overflow="hidden" width="full" height="full">
						<Text
							as={motion.p}
							animation={slideAnimation}
							fontSize="3xl"
							fontWeight="400"
							textAlign={textAlign}
							fontFamily="monospace"
						>
							{texts[num]}
						</Text>
					</Box>
					<Text fontSize="2xl" fontWeight="500">
						from Riau, Indonesia
					</Text>
				</Flex>
			</Center>
		</React.Fragment>
	)
}

Home.getLayout = function getHomeLayout(page) {
	return <MainLayout>{page}</MainLayout>
}

export default Home
