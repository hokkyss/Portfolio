import { LinkBox, BoxProps, forwardRef, Box } from '@chakra-ui/react'

export const Card = forwardRef<
	Omit<BoxProps, 'borderTopColor' | 'borderTopWidth'> & {
		borderTopColor: BoxProps['bgColor'][]
	},
	'div'
>(function Card(props, ref) {
	const { children, borderTopColor, ...rest } = props

	return (
		<LinkBox
			m="2"
			rounded="md"
			shadow="md"
			ref={ref}
			as="article"
			overflow="hidden"
		>
			<Box
				height="2"
				width="full"
				bgGradient={`linear(to-r, ${borderTopColor.join(', ')})`}
			/>
			<Box
				px="6"
				py="12"
				bgColor="blackAlpha.900"
				transitionDelay="0s"
				transitionDuration="0.15s"
				transitionTimingFunction="linear"
				// width="sm"
				style={{ width: '22rem' }}
				{...rest}
			>
				{children}
			</Box>
		</LinkBox>
	)
})
