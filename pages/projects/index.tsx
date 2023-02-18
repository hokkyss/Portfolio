import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'

import { ProjectCard, UnderDevelopment } from '~/components/modules'
import { getProjects, TimeSec } from '~/lib/common'

const ProjectList: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	projects,
}) => {
	return (
		<React.Fragment>
			<Head>
				<title>Projects · Hokki Suwanda</title>
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center">
				{projects.length > 0 ? (
					projects.map((project) => (
						<ProjectCard project={project} key={'project-' + project.slug} />
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
	try {
		const projects = await getProjects()

		return {
			props: {
				projects: projects,
			},
			revalidate: 12 * TimeSec.HOUR, // 10 seconds or 12 hours
		}
	} catch {
		return {
			notFound: true,
		}
	}
}

export default ProjectList
