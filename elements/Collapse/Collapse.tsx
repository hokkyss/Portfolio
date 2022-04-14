import * as React from 'react'
import {
	Box,
	Collapse as ChakraCollapse,
	useDisclosure,
} from '@chakra-ui/react'

type CollapseProps = {
	title: string
	children: React.ReactNode
}

export const Collapse = React.memo(function Collapse(props: CollapseProps) {
	const { title, children } = props
	const { isOpen, onToggle } = useDisclosure()

	return (
		<React.Fragment>
			<Box as="button" onClick={onToggle}>
				{title}
			</Box>
			<ChakraCollapse in={isOpen} animateOpacity>
				{children}
			</ChakraCollapse>
		</React.Fragment>
	)
})
