import * as React from 'react'
import { Spinner, Portal, Center, Box } from '@chakra-ui/react'

export const Loading = React.memo(function Loading() {
	return (
		<Portal>
			<Box pos="absolute" left={0} right={0} top={0} bottom={0}>
				<Center bgColor="blackAlpha.500" width="100%" height="100%">
					<Spinner
						size="lg"
						thickness="3px"
						colorScheme="teal"
						emptyColor="gray.200"
						color="teal.500"
					/>
				</Center>
			</Box>
		</Portal>
	)
})
