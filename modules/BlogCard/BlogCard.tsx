import {
	Button,
	Flex,
	Heading,
	LinkOverlay,
	SkeletonText,
	Spacer,
	Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

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
				<Spacer height="2" />
				<SkeletonText noOfLines={1} skeletonHeight="7" />
				<Spacer height="2" />
				<SkeletonText noOfLines={2} skeletonHeight="4" />
			</Card>
		</React.Fragment>
	)
})

export const BlogCard: React.FC<BlogCardProps> = (props) => {
	const { blog } = props

	return (
		<Card textAlign="justify" as="article">
			<Flex align="center">
				<Text fontSize="sm" color="gray.500">
					{formatDate(blog.createdAt)}
				</Text>
				<Spacer />
			</Flex>
			<Spacer height="2" />
			<Heading as="h3" size="md" noOfLines={2}>
				<NextLink href={`/blogs/${blog.uuid}`} passHref>
					<LinkOverlay>{blog.title}</LinkOverlay>
				</NextLink>
			</Heading>
			<Spacer height="2" />
			<Text fontSize="md" noOfLines={2}>
				{blog.subtitle}
			</Text>
		</Card>
	)
}
