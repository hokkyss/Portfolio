import { LinkBox, BoxProps, forwardRef } from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	return (
		<LinkBox
			{...props}
			ref={ref}
			w="96"
			rounded="sm"
			shadow="md"
			px="6"
			py="12"
			bgColor="blackAlpha.900"
			color="white"
		/>
	)
})
