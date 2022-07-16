import { LinkBox, BoxProps, forwardRef, Box } from '@chakra-ui/react'

const defaultColor: BoxProps['bgColor'][] = ['whiteAlpha.500', 'whiteAlpha.900']

export const Card = forwardRef<
	Omit<BoxProps, 'borderTopColor' | 'borderTopWidth'> & {
		borderTopColor?: BoxProps['bgColor'][]
	},
	'div'
>(function Card(props, ref) {
	const { children, borderTopColor = defaultColor, ...rest } = props

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
				bgGradient={`linear(to-r, ${(borderTopColor.length === 0
					? defaultColor
					: borderTopColor.length === 1
					? borderTopColor.concat(borderTopColor)
					: borderTopColor
				).join(', ')})`}
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
