import * as React from 'react'
import { NextPage } from 'next'
import { BlogCard } from '~/modules'

import { underDevelopment } from '~/constants/underDevelopment'
import { Flex } from '@chakra-ui/react'

const ProjectList: NextPage = () => {
	return (
		<Flex direction="row" wrap="wrap" justifyContent="center">
			<BlogCard blog={underDevelopment} />
		</Flex>
	)

	return <React.Fragment></React.Fragment>
}

export default ProjectList
