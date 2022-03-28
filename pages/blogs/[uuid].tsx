import * as React from 'react'
import { NextPage } from 'next'
import { useSafeLayoutEffect } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'

import { getSpecificBlogs } from '~/api/firebase'
import { Loading } from '~/elements'
import Error from '~/pages/_error'
import { app, convertFirestoreError } from '~/utils/firebase'

const auth = getAuth(app)

const BlogContent: NextPage = () => {
	const router = useRouter()
	const { query } = router
	const { uuid } = query

	const [blog, setBlog] = React.useState<Blog>()
	const [statusCode, setStatusCode] = React.useState(200)

	useSafeLayoutEffect(() => {
		if (uuid) {
			const currentBlog = getSpecificBlogs(typeof uuid === 'string' ? uuid : '')

			const unsubscribe = onSnapshot(
				currentBlog,
				(snapshot) => {
					setStatusCode(200)
					setBlog(snapshot.data())
				},
				(error) => {
					setStatusCode(convertFirestoreError(error.code) ?? 404)
					setBlog(undefined)
				}
			)

			return () => unsubscribe()
		}
	}, [uuid])

	if (!uuid || (typeof uuid === 'object' && !uuid[0]) || statusCode >= 400) {
		return <Error statusCode={statusCode} />
	}

	if (!blog) return <Loading />

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
