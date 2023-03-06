import { Skeleton } from '@chakra-ui/react'
import * as React from 'react'

const HeaderSkeleton = React.memo(function HeaderSkeleton() {
	return <Skeleton w="full" h="72px" />
})

export default HeaderSkeleton
