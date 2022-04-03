import {
	Flex,
	Heading,
	LinkOverlay,
	SkeletonText,
	Spacer,
	Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

import { specificBlogPath } from '~/constants/paths'
import { Card } from '~/elements'
import { formatDate } from '~/utils/date'

type BlogCardProps = {
	blog: Blog
}

export const BlogCardSkeleton = React.memo(function BlogCardSkeleton() {
	return (
		<React.Fragment>
			<Card>
				<SkeletonText noOfLines={1} skeletonHeight="4" w="36" />
				<Spacer height="4" />
				<SkeletonText noOfLines={2} skeletonHeight="7" />
				<Spacer height="4" />
				<SkeletonText noOfLines={2} skeletonHeight="4" />
			</Card>
		</React.Fragment>
	)
})

export const BlogCard: React.FC<BlogCardProps> = (props) => {
	const { blog } = props

	return (
		<Card textAlign="justify" as="article" px="6" py="12">
			<Flex align="center">
				<Text fontSize="sm" color="gray.500">
					{formatDate(blog.createdAt)}
				</Text>
				<Spacer />
			</Flex>
			<Spacer height="4" />
			<Heading as="h3" size="md" noOfLines={2}>
				<NextLink
					href={{ pathname: specificBlogPath.path, query: { uuid: blog.uuid } }}
					passHref
				>
					<LinkOverlay>{blog.title}</LinkOverlay>
				</NextLink>
			</Heading>
			<Spacer height="4" />
			<Text fontSize="md" noOfLines={2} color="gray.400">
				{blog.subtitle}
			</Text>
		</Card>
	)
}
