import * as React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import {
	FirebaseAppProvider,
	FirestoreProvider,
	StorageProvider,
} from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import '~/styles/globals.css'

import { Layout } from '~/components/layouts'
import { ErrorBoundary } from '~/components/elements'
import { initializeFirebaseClient } from '~/utils/common'
import { theme } from '~/utils/client'

function MyApp({ Component, pageProps }: AppProps) {
	const firebaseApp = React.useMemo(initializeFirebaseClient, [])

	return (
		<ErrorBoundary>
			<FirebaseAppProvider firebaseApp={firebaseApp}>
				<FirestoreProvider sdk={getFirestore(firebaseApp)}>
					<StorageProvider sdk={getStorage(firebaseApp)}>
						<ChakraProvider theme={theme}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ChakraProvider>
					</StorageProvider>
				</FirestoreProvider>
			</FirebaseAppProvider>
		</ErrorBoundary>
	)
}

export default MyApp
