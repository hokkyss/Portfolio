import { LinkBox, BoxProps, forwardRef } from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	return (
		<LinkBox
			{...props}
			w={{ sm: 'xs', md: 'sm', lg: 'xl' }}
			padding="4"
			rounded="sm"
			shadow="md"
			ref={ref}
		/>
	)
})
