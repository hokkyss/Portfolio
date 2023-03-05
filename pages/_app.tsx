import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import '~/styles/globals.css'

import { ErrorBoundary } from '~/components/elements'
import { theme } from '~/lib/client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page)

	return (
		<ErrorBoundary>
			<ChakraProvider theme={theme}>
				{getLayout(<Component {...pageProps} />)}
			</ChakraProvider>
		</ErrorBoundary>
	)
}

export default MyApp
