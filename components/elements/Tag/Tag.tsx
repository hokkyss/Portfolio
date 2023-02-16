import * as React from 'react'
import { Skeleton, Tag as ChakraTag } from '@chakra-ui/react'

export const TagSkeleton = React.memo(function TagSkeleton() {
	return <Skeleton m="0.5" height="6" w="20" rounded="6px" />
})

export const Tag = React.memo(function Tag() {
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
