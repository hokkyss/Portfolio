import * as React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useBlog } from '~/api/firebase'
import { Loading } from '~/elements'
import Error from '~/pages/_error'
import { convertFirestoreError } from '~/utils/firebase'

const BlogContent: NextPage = () => {
	const router = useRouter()
	const { query } = router
	const { uuid } = query

	const { blog, loaded, error } = useBlog(typeof uuid === 'string' ? uuid : '')

	if (!uuid || typeof uuid !== 'string' || error) {
		return <Error statusCode={convertFirestoreError(error?.code) ?? 404} />
	}

	if (!loaded || !blog) return <Loading />

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss - {blog.title}</title>
				<meta name="description" content={blog.subtitle} />
			</Head>
			{blog.uuid}
		</React.Fragment>
	)
}

export default BlogContent
