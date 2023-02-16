import {
	Flex,
	Heading,
	HStack,
	LinkOverlay,
	SkeletonText,
	Spacer,
	Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

import { specificBlogPath } from '~/constants/paths'
import { Card, Tag, TagSkeleton } from '~/components/elements'
import { formatDate } from '~/utils/date'

type BlogCardProps = {
	blog: Blog
}

export const BlogCardSkeleton = React.memo(function BlogCardSkeleton() {
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

export const BlogCard = React.memo(function BlogCard(props: BlogCardProps) {
	const { blog } = props

	return (
		<Card
			textAlign="justify"
			_hover={{ textColor: 'teal.300' }}
			borderTopColor={blog.tags.map((t) => t.name)}
		>
			<Flex align="center">
				<Text fontSize="sm" color="gray.500">
					{formatDate(blog.createdAt)}
				</Text>
				<Spacer />
			</Flex>
			<Spacer height="4" />
			<Heading as="h3" size="md" noOfLines={2}>
				<NextLink
					href={{ pathname: specificBlogPath.path, query: { id: blog.id } }}
					passHref
				>
					<LinkOverlay>{blog.title}</LinkOverlay>
				</NextLink>
			</Heading>
			<Spacer height="4" />
			<Text fontSize="md" noOfLines={2} color="gray.500" mb="4">
				{blog.subtitle}
			</Text>
			{/* {blog.tags.map((tag) => (
				<Tag tag={tag.name} key={tag.id} />
			))} */}
		</Card>
	)
})
