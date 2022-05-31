import * as React from 'react'
import { Tag as ChakraTag, TagLabel, TagLeftIcon } from '@chakra-ui/react'

import { Icons } from '~/elements'
import { Tags } from '~/constants/tags'

type TagProps = {
	tag: TagType
}

export const Tag = React.memo(function Tag(props: TagProps) {
	const { tag } = props

	return (
		<ChakraTag
			variant="subtle"
			bgColor={tag}
			m="0.5"
			_hover={{ transform: 'scale(1.15)' }}
			transitionDuration="0.1s"
			transitionTimingFunction="linear"
			transitionDelay="0s"
			transitionProperty="all"
		>
			<TagLeftIcon as={Icons[tag]} />
			<TagLabel>{Tags[tag]}</TagLabel>
		</ChakraTag>
	)
})
