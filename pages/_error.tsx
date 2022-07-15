import { Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'

const Error: NextPage<{ statusCode?: number }> = ({ statusCode = 404 }) => {
	return (
		<React.Fragment>
			<Head>
				<title>Error {statusCode}</title>
			</Head>
			<Heading>Error {statusCode}</Heading>
		</React.Fragment>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404

	return {
		statusCode,
	}
}

export default Error
