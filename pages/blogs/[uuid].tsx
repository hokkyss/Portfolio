import * as React from 'react'
import { NextPage } from 'next'
// import Head from 'next/head'
// import { useRouter } from 'next/router'

// import { Loading } from '~/elements'
// import Error from '~/pages/_error'
// import { FetchBlog } from '~/api/swr'
import { UnderDevelopment } from '~/modules'

const BlogContent: NextPage = () => {
	// const router = useRouter()
	// const { query } = router
	// const { uuid } = query

	// const { blog, blogError, blogLoaded } = FetchBlog(
	// 	typeof uuid === 'string' ? uuid : undefined
	// )

	return <UnderDevelopment />

	// if (!uuid || typeof uuid !== 'string' || blogError) {
	// 	return <Error statusCode={blogError} />
	// }

	// if (!blogLoaded || !blog) return <Loading />

	// return (
	// 	<React.Fragment>
	// 		<Head>
	// 			<title>{blog.title} · hokkyss</title>
	// 			<meta name="description" content={blog.subtitle} />
	// 		</Head>
	// 		{blog.uuid}
	// 	</React.Fragment>
	// )
}

export default BlogContent
