import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { ProjectCard, UnderDevelopment } from '~/modules'
import { fetchProjects } from '~/lib/axios'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

const ProjectList: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	projects,
}) => {
	return (
		<React.Fragment>
			<Head>
				<title>Projects · Hokki Suwanda</title>
				<meta name="description" content="See my content to the end!" />
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center">
				{projects.length > 0 ? (
					projects.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))
				) : (
					<UnderDevelopment />
				)}
			</Flex>
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<{
	projects: Project[]
}> = async (context) => {
	if (process.env.NODE_ENV !== 'development') {
		return {
			props: {
				projects: [],
			},
		}
	}

	const projects = await fetchProjects()

	return {
		props: {
			projects: projects,
		},
		revalidate: process.env.NODE_ENV === 'development' ? 10 : 12 * 60 * 60, // 10 seconds or 12 hours
	}
}

export default ProjectList
