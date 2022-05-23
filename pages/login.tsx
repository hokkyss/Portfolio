import * as React from 'react'
import {
	getAuth,
	GoogleAuthProvider,
	signOut,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import {
	Button,
	Text,
	Box,
	LinkOverlay,
	Input,
	FormLabel,
	useToast,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { GoSignOut } from 'react-icons/go'

import { app } from '~/utils/firebase'
import { paths } from '~/constants/paths'
import { FormControl } from '~/elements'
import { useRouter } from 'next/router'
import Error from './_error'

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
provider.addScope('https://www.googleapis.com/auth/userinfo.email')
// provider.addScope('https://www.googleapis.com/auth/calendar.events')
// provider.addScope('https://www.googleapis.com/auth/youtube.readonly')

const Login: NextPage = () => {
	const router = useRouter()
	const toast = useToast({
		position: 'bottom-right',
		id: 'toast',
		isClosable: true,
		variant: 'subtle',
	})

	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const loginWithFirebase = React.useCallback(() => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => toast({ title: 'Logged in successfully' }))
			.then(() => router.replace('/'))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email, password, toast])

	const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> =
		React.useCallback((e) => {
			setEmail(e.target.value)
		}, [])

	const onChangePassword: React.ChangeEventHandler<HTMLInputElement> =
		React.useCallback((e) => setPassword(e.target.value), [])
	// const loginWithGoogle = React.useCallback(() => {
	// 	signInWithPopup(auth, provider, browserPopupRedirectResolver).then(
	// 		(result) => {
	// 			const credential = GoogleAuthProvider.credentialFromResult(result)

	// 			if (!credential) return
	// 			signInWithCredential(auth, credential)
	// 		}
	// 	)
	// }, [])
	const logoutFromGoogle = React.useCallback(() => signOut(auth), [])

	return <Error statusCode={404} />

	return (
		<React.Fragment>
			<Head>
				<title>hokkyss - Login</title>
			</Head>
			<Box>
				<Box m="2">
					<Button colorScheme="teal">
						<NextLink href={paths.home.path} passHref>
							<LinkOverlay>
								<Text>{paths.home.name}</Text>
							</LinkOverlay>
						</NextLink>
					</Button>
				</Box>
				<Box m="2">
					<Button colorScheme="green">
						<NextLink href={paths.blogs.path} passHref>
							<LinkOverlay>
								<Text>{paths.blogs.name}</Text>
							</LinkOverlay>
						</NextLink>
					</Button>
				</Box>
				<FormControl
					aria-required
					aria-autocomplete="none"
					aria-valuetext={email}
					isRequired
				>
					<Input
						name="email"
						id="login-email"
						w="60"
						autoComplete="none"
						placeholder=" "
						value={email}
						onChange={onChangeEmail}
					/>
					<FormLabel>Email</FormLabel>
				</FormControl>
				<FormControl
					aria-required
					aria-autocomplete="none"
					aria-valuetext={password}
					isRequired
				>
					<Input
						name="password"
						id="login-password"
						w="60"
						type="password"
						placeholder=" "
						value={password}
						onChange={onChangePassword}
					/>
					<FormLabel>Password</FormLabel>
				</FormControl>
				{/* <Box m="2">
					<Button onClick={toggleColorMode}>
						<Text>Toggle Dark Mode</Text>
					</Button>
				</Box> */}
				<Box m="2">
					<Button leftIcon={<FcGoogle />} onClick={loginWithFirebase}>
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
