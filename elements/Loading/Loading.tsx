import * as React from 'react'
import { Spinner, Portal, Center } from '@chakra-ui/react'

export const Loading = React.memo(function Loading() {
	return (
		<Portal>
			<Center height="100vh">
				<Spinner
					size="lg"
					thickness="3px"
					colorScheme="teal"
					emptyColor="gray.200"
					color="teal.500"
				/>
			</Center>
		</Portal>
	)
})
