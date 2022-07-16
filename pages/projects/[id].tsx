import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'
import { useRouter } from 'next/router'

import { UnderDevelopment } from '~/modules'
import { getAllProjects, getOneProject } from '~/lib/axios'

const ProjectDetail: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ project }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <UnderDevelopment />
	}

	return <UnderDevelopment />
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	if (process.env.NODE_ENV !== 'development') {
		return {
			fallback: true,
			paths: [],
		}
	}

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
		revalidate: 12 * 60 * 60, // 12 hours
	}
}

export default ProjectDetail
