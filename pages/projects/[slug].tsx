import * as React from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
	getProjects,
	getOneProject,
	REVALIDATE_TIME_IN_SEC,
} from '~/lib/common'
import { Loading } from '~/components/elements'
import MainLayout from '~/components/layouts/MainLayout'

const ProjectDetail: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ project }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <Loading />
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
		revalidate: REVALIDATE_TIME_IN_SEC,
	}
}

ProjectDetail.getLayout = function getProjectDetailLayout() {
	return <MainLayout />
}

export default ProjectDetail
