import * as React from 'react'
import { Box, ChakraProvider } from '@chakra-ui/react'

import '~/styles/globals.css'

import { ErrorBoundary } from '~/components/elements'
import { theme } from '~/lib/client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = React.useCallback(
		() => (Component.getLayout ? Component.getLayout() : <React.Fragment />),
		[Component]
	)

	return (
		<ErrorBoundary>
			<ChakraProvider theme={theme}>
				<Box display="flex" height="100vh" flexDir="column">
					{getLayout()}
					<Box display="flex" flexGrow={1} flexShrink={0}>
						<Component {...pageProps} />
					</Box>
				</Box>
			</ChakraProvider>
		</ErrorBoundary>
	)
}

export default MyApp
