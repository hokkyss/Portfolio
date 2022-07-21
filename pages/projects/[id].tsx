import * as React from 'react'
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSafeLayoutEffect } from '@chakra-ui/react'

import { getAllProjects, getOneProject } from '~/lib/axios'
import { Loading } from '~/elements'
import { DEFAULT_TIMEOUT } from '~/constants/time'
import { HttpError, HttpStatus } from '~/utils/error'

const ProjectDetail: NextPage<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ project }) => {
	const router = useRouter()
	const [loading, setLoading] = React.useState(true)

	useSafeLayoutEffect(() => {
		if (router.isFallback) {
			const timeout = setTimeout(function () {
				setLoading(false)
			}, DEFAULT_TIMEOUT)

			return () => clearTimeout(timeout)
		}
	}, [router.isFallback])

	if (router.isFallback && !loading) {
		throw new HttpError(HttpStatus.REQUEST_TIMEOUT)
	}

	if (router.isFallback && loading) {
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
		revalidate: 12 * 60 * 60, // 12 hours
	}
}

export default ProjectDetail
