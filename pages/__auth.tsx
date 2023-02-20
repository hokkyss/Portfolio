import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import * as React from 'react'

import { Loading } from '~/components/elements'
import { initializeFirebaseClient } from '~/lib/common'
import { accessTokenConverter } from '~/lib/server'

const AuthPage: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	return <Loading />
}

export const getServerSideProps: GetServerSideProps = async function (ctx) {
	const accessToken = ctx.query.accessToken
	if (typeof accessToken !== 'string') {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const firebaseApp = initializeFirebaseClient()
	const firestore = getFirestore(firebaseApp)
	const auth = getAuth(firebaseApp)

	if (auth.currentUser) {
		return {
			redirect: {
				destination: '/contact',
				permanent: false,
			},
		}
	}

	const documentRef = doc(firestore, 'accessTokens', accessToken).withConverter(
		accessTokenConverter
	)

	try {
		const accessTokenSnapshot = await getDoc(documentRef)

		if (!accessTokenSnapshot.exists() || accessTokenSnapshot.data().used) {
			throw new Error('Not Found')
		}

		const customToken = accessTokenSnapshot.data().customToken
		await signInWithCustomToken(auth, customToken)
		await setDoc(documentRef, { used: true }, { merge: true })

		return {
			redirect: {
				destination: '/blogs',
				permanent: false,
			},
		}
	} catch {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
}

export default AuthPage
