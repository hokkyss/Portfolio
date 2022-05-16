import { LinkBox, BoxProps, forwardRef } from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	return (
		<LinkBox
			{...props}
			ref={ref}
			rounded="md"
			shadow="md"
			px="6"
			py="12"
			bgColor="blackAlpha.900"
			transitionDelay="0s"
			transitionDuration="0.15s"
			transitionTimingFunction="linear"
			style={{ width: '22rem' }}
		/>
	)
})
