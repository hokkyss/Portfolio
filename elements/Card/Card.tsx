import { LinkBox, BoxProps, forwardRef } from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	return (
		<LinkBox
			ref={ref}
			rounded="md"
			shadow="md"
			px="6"
			py="12"
			bgColor="blackAlpha.900"
			transitionDelay="0s"
			transitionDuration="0.15s"
			transitionTimingFunction="linear"
			overflow="hidden"
			as="article"
			// width="sm"
			m="2"
			style={{ width: '22rem' }}
			{...props}
		/>
	)
})
