import { NextPage } from 'next'

const Error: NextPage<{ statusCode?: number }> = ({ statusCode = 404 }) => {
	return <h1>Error - {statusCode}</h1>
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404

	return {
		statusCode,
	}
}

export default Error
