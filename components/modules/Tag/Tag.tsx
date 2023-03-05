import * as React from 'react'
import { Tag as ChakraTag } from '@chakra-ui/react'

type TagProps = {
	tag: string
}

const Tag = React.memo<TagProps>(function Tag({ tag }) {
	return (
		<ChakraTag
			variant="subtle"
			// bgColor={tag}
			m="0.5"
			_hover={{ transform: 'scale(1.15)' }}
			transitionDuration="0.1s"
			transitionTimingFunction="linear"
			transitionDelay="0s"
			transitionProperty="all"
		>
			{/*  */}
		</ChakraTag>
	)
})

export default Tag
