import { Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'
import { HttpError } from '~/utils/error'

const Error: NextPage<{ statusCode?: number }> = ({ statusCode = 404 }) => {
	const err = React.useMemo(() => new HttpError(statusCode), [statusCode])
	return (
		<React.Fragment>
			<Head>
				<title>
					Error {statusCode} {err.message}
				</title>
			</Head>
			<Heading>
				Error {statusCode} {err.message}
			</Heading>
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
