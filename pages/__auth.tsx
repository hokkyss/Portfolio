import { signInWithCustomToken } from 'firebase/auth'
import type { InferGetServerSidePropsType, NextPage } from 'next'
import {
	serverSideSignIn,
	withServerSideUser,
} from 'next-firebase-session-auth'
import * as React from 'react'

import { Loading } from '~/components/elements'
import { initializeFirebaseClient, getCustomToken } from '~/lib/common'
import { initializeFirebaseAdmin } from '~/lib/server'

const AuthPage: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	return <React.Fragment />
}

export const getServerSideProps = withServerSideUser(async function ({
	isSignedIn,
	...ctx
}) {
	if (isSignedIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const accessToken = ctx.query.accessToken
	if (typeof accessToken !== 'string') {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const customToken = await getCustomToken(accessToken)
	await serverSideSignIn(
		ctx.req,
		ctx.res,
		(auth) => signInWithCustomToken(auth, customToken),
		initializeFirebaseAdmin(),
		initializeFirebaseClient()
	)

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
},
initializeFirebaseAdmin())

export default AuthPage
