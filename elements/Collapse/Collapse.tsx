import * as React from 'react'
import {
	Button,
	Collapse as ChakraCollapse,
	Icon,
	keyframes,
	useDisclosure,
} from '@chakra-ui/react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { Card } from '~/elements'

type CollapseProps = {
	title: string
	children: React.ReactNode
}

const spin = keyframes`
  0% { transform: rotate(180deg); }
	50% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`
const spinAnimation = `${spin} 0.25s ease-in-out 1`

export const Collapse = React.memo(function Collapse(props: CollapseProps) {
	const { title, children } = props
	const { isOpen, onToggle } = useDisclosure()

	return (
		<React.Fragment>
			<Button
				as="div"
				onClick={onToggle}
				py="2"
				px="2"
				// backgroundColor="teal.200"
				width="full"
				style={{}}
				leftIcon={
					<Icon
						as={isOpen ? BsChevronUp : BsChevronDown}
						animation={spinAnimation}
						transitionTimingFunction="linear"
						transitionDuration="1"
					/>
				}
			>
				{title}
			</Button>
			<ChakraCollapse in={isOpen} animateOpacity>
				<Card
					px="2"
					py="2"
					width="full"
					backgroundColor="blackAlpha.500"
					style={{}}
				>
					{children}
				</Card>
			</ChakraCollapse>
		</React.Fragment>
	)
})
