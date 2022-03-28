import * as React from 'react'
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	browserPopupRedirectResolver,
	signOut,
	signInWithCredential,
} from 'firebase/auth'
import Head from 'next/head'
import { NextPage } from 'next'
import { Button, Text, Box } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { GoSignOut } from 'react-icons/go'

import { app } from '~/utils/firebase'

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const Login: NextPage = () => {
	const loginWithGoogle = React.useCallback(() => {
		signInWithPopup(auth, provider, browserPopupRedirectResolver).then(
			(result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result)

				if (!credential) return
				signInWithCredential(auth, credential)
			}
		)
	}, [])
	const logoutFromGoogle = React.useCallback(() => signOut(auth), [])

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss - Login</title>
			</Head>
			<Box>
				<Box m="2">
					<Button leftIcon={<FcGoogle />} onClick={loginWithGoogle}>
						<Text>Sign in with Google</Text>
					</Button>
				</Box>
				<Box m="2">
					<Button
						colorScheme="red"
						leftIcon={<GoSignOut />}
						onClick={logoutFromGoogle}
					>
						<Text>Sign out</Text>
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	)
}

export default Login
