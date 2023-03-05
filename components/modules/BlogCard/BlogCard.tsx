import { Flex, Heading, LinkOverlay, Spacer, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import * as React from 'react'

import { Card } from '~/components/elements'
import { formatDate } from '~/lib/common'
import TagSkeleton from '../Tag/TagSkeleton'

const Tag = dynamic(() => import('~/components/modules/Tag/Tag'), {
	loading: () => <TagSkeleton />,
})

export type BlogCardProps = {
	blog: Blog
}

const BlogCard = React.memo(function BlogCard(props: BlogCardProps) {
	const { blog } = props

	return (
		<Card
			textAlign="justify"
			_hover={{ textColor: 'teal.300' }}
			borderTopColor={blog.tags}
		>
			<Flex align="center">
				<Text fontSize="sm" color="gray.500">
					{formatDate(blog.createdAt)}
				</Text>
				<Spacer />
			</Flex>
			<Spacer height="4" />
			<Heading as="h3" size="md" noOfLines={2}>
				<LinkOverlay as={NextLink} href={`/blogs/${blog.slug}`}>
					{blog.title}
				</LinkOverlay>
			</Heading>
			<Spacer height="4" />
			<Text fontSize="md" noOfLines={2} color="gray.500" mb="4">
				{blog.subtitle}
			</Text>
			{blog.tags.map((tag) => (
				<React.Suspense key={tag}>
					<Tag tag={tag} />
				</React.Suspense>
			))}
		</Card>
	)
})

export default BlogCard
