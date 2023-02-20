import * as React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import '~/styles/globals.css'

import { Layout } from '~/components/layouts'
import { ErrorBoundary } from '~/components/elements'
import { theme } from '~/lib/client'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</ErrorBoundary>
	)
}

export default MyApp
