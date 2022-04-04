import {
	LinkBox,
	BoxProps,
	forwardRef,
	useColorModeValue,
} from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	const bgColor = useColorModeValue('gray.200', 'blackAlpha.900')

	return (
		<LinkBox
			{...props}
			ref={ref}
			rounded="md"
			shadow="md"
			px="6"
			py="12"
			bgColor={bgColor}
			transitionDelay="0s"
			transitionDuration="0.15s"
			transitionTimingFunction="linear"
			style={{ width: '22rem' }}
		/>
	)
})
