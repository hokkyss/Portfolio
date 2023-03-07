import { GetServerSideProps } from 'next'
import { serverSideSignOut } from 'next-firebase-session-auth'
import * as React from 'react'
import { Loading } from '~/components/elements'

const LogoutPage: NextPageWithLayout = () => {
	return <Loading />
}

export const getServerSideProps: GetServerSideProps = async function (ctx) {
	await serverSideSignOut(ctx.req, ctx.res)

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}

export default LogoutPage
