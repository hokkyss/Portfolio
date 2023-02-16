import {
	Box,
	Fade,
	Heading,
	Img as ChakraImage,
	LinkOverlay,
	Spacer,
	Text,
	useBoolean,
	useSafeLayoutEffect,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import * as React from 'react'

import { specificProjectPath } from '~/constants/paths'
import { Card } from '~/components/elements'

type ProjectCardProps = {
	project: Project
}

export const ProjectCard = React.memo(function ProjectCard({
	project,
}: ProjectCardProps) {
	const [fade, { on, off }] = useBoolean(true)
	const [thumbnailIndex, setThumbnailIndex] = React.useState(0)

	useSafeLayoutEffect(() => {
		if (project.thumbnails.length > 1) {
			const interval = setInterval(function () {
				off()
				const timeout = setTimeout(function () {
					setThumbnailIndex((i) => (i + 1) % project.thumbnails.length)
					on()

					clearTimeout(timeout)
				}, 100)
			}, 3000)

			return () => clearInterval(interval)
		}
	}, [project, off, on])

	return (
		<Card
			p={0}
			_hover={{ textColor: 'teal.300' }}
			borderTopColor={project.tags.map((t) => t.name)}
		>
			<Fade in={fade}>
				<ChakraImage
					src={project.thumbnails[thumbnailIndex]}
					alt={project.title}
					width="full"
					height="48"
					objectFit="cover"
					objectPosition="50% 0"
				/>
			</Fade>
			<Box p="4">
				<Heading as="h6" size="sm" noOfLines={1}>
					<NextLink
						href={{
							pathname: specificProjectPath.path,
							query: { id: project.slug },
						}}
						passHref
					>
						<LinkOverlay>{project.title}</LinkOverlay>
					</NextLink>
				</Heading>
				<Spacer height="4" />
				<Text fontSize="md" noOfLines={2} color="gray.500">
					{project.markdown}
				</Text>
			</Box>
		</Card>
	)
})
