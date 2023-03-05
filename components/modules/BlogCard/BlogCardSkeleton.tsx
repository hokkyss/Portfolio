import { HStack, SkeletonText, Spacer } from '@chakra-ui/react'
import * as React from 'react'

import { Card } from '~/components/elements'
import TagSkeleton from '../Tag/TagSkeleton'

const BlogCardSkeleton = React.memo(function BlogCardSkeleton() {
	return (
		<Card>
			<SkeletonText noOfLines={1} skeletonHeight="4" w="36" />
			<Spacer height="6" />
			<SkeletonText noOfLines={2} skeletonHeight="5" />
			<Spacer height="5" />
			<SkeletonText noOfLines={1} skeletonHeight="4" />
			<Spacer height="5" />
			<HStack>
				<TagSkeleton />
				<TagSkeleton />
			</HStack>
		</Card>
	)
})

export default BlogCardSkeleton
