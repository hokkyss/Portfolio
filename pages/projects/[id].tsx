import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getAllProjects, getOneProject } from '~/lib'
import { Loading } from '~/components/elements'
import { Time } from '~/constants/time'

const ProjectDetail: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ project }) => {
	const router = useRouter()

	if (router.isFallback) {
		return (
			<React.Fragment>
				<Head>
					<title>Loading · Hokki Suwanda</title>
				</Head>
				<Loading />
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<Head>
				<title>{project.title} · Hokki Suwanda</title>
			</Head>
		</React.Fragment>
	)
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const projects = await getAllProjects()

	return {
		fallback: true,
		paths: projects
			.map((p) => ({ params: { id: p.id } }))
			.concat(projects.map((p) => ({ params: { id: p.slug } }))),
	}
}

export const getStaticProps: GetStaticProps<
	{
		project: Project
	},
	{ id: string }
> = async (context) => {
	if (!context.params || !context.params.id) {
		return {
			notFound: true,
		}
	}

	const project = await getOneProject(context.params.id)

	return {
		props: {
			project: project,
		},
		revalidate: 12 * Time.HOUR, // 12 hours
	}
}

export default ProjectDetail
