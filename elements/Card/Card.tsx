import { LinkBox, BoxProps, forwardRef } from '@chakra-ui/react'

export const Card = forwardRef<BoxProps, 'div'>(function Card(props, ref) {
	return (
		<LinkBox
			{...props}
			w={{ base: 'xs', sm: 'sm', md: 'md', lg: 'xl', xl: '2xl' }}
			padding="4"
			rounded="sm"
			shadow="md"
			ref={ref}
		/>
	)
})
