import { Flex } from '@chakra-ui/react'
import * as React from 'react'

import { underDevelopment } from '~/constants/underDevelopment'
import { BlogCard } from '~/modules'

export const UnderDevelopment = React.memo(function UnderDevelopment() {
	return (
		<Flex direction="row" wrap="wrap" justifyContent="center">
			<BlogCard blog={underDevelopment} />
		</Flex>
	)
})
