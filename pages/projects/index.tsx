import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

import { ProjectCard, UnderDevelopment } from '~/modules'
import { fetchProjects } from '~/lib/axios'

const ProjectList: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	projects,
}) => {
	return (
		<React.Fragment>
			<UnderDevelopment />
			{projects.map((project) => (
				<ProjectCard project={project} key={project.id} />
			))}
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<{
	projects: Project[]
}> = async (context) => {
	const projects = await fetchProjects()

	return {
		props: {
			projects: process.env.NODE_ENV === 'development' ? projects : [],
		},
		revalidate: process.env.NODE_ENV === 'development' ? 10 : 12 * 60 * 60, // 10 seconds or 12 hours
	}
}

export default ProjectList
