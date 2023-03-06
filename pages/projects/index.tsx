import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Flex } from '@chakra-ui/react'

import { getProjects, REVALIDATE_TIME_IN_SEC } from '~/lib/common'
import BlogCardSkeleton from '~/components/modules/BlogCard/BlogCardSkeleton'
import MainLayout from '~/components/layouts/MainLayout'
const ProjectCard = dynamic(
	() => import('~/components/modules/ProjectCard/ProjectCard'),
	{
		loading: () => <BlogCardSkeleton />,
	}
)

const UnderDevelopment = dynamic(
	() => import('~/components/modules/UnderDevelopment'),
	{
		loading: () => <BlogCardSkeleton />,
	}
)

const ProjectList: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ projects }) => {
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
			revalidate: REVALIDATE_TIME_IN_SEC,
		}
	} catch {
		return {
			notFound: true,
		}
	}
}

ProjectList.getLayout = function getProjectListLayout() {
	return <MainLayout />
}

export default ProjectList
