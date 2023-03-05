import * as React from 'react'
import { Skeleton } from '@chakra-ui/react'

const TagSkeleton = React.memo(function TagSkeleton() {
	return <Skeleton m="0.5" height="6" w="20" rounded="6px" />
})

export default TagSkeleton
