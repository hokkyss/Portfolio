import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getProjects, getOneProject, TimeSec } from '~/lib/common'
import { Loading } from '~/components/elements'

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
	const projects = await getProjects()

	return {
		fallback: true,
		paths: projects.map((p) => ({ params: { slug: p.slug } })),
	}
}

export const getStaticProps: GetStaticProps<
	{
		project: Project
	},
	{ slug: string }
> = async (context) => {
	if (!context.params || !context.params.slug) {
		return {
			notFound: true,
		}
	}

	const project = await getOneProject(context.params.slug)
	if (!project) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			project: project,
		},
		revalidate: 12 * TimeSec.HOUR, // 12 hours
	}
}

export default ProjectDetail
