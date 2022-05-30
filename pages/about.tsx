import * as React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Collapse, Tag } from '~/elements'
import { Box, Container, ContainerProps, Heading } from '@chakra-ui/react'
import { useBreakpointValue } from '~/hooks'
import { UnderDevelopment } from '~/modules'

const skills: {
	databases: TagType[]
	frameworks: TagType[]
	languages: TagType[]
} = {
	databases: ['mysql', 'postgresql', 'mariadb'],
	frameworks: [
		'react',
		'express',
		'nodejs',
		'flask',
		'django',
		'firebase',
		'nextjs',
		'prisma',
		'flutter',
		'tailwindcss',
		'chakra',
	],
	languages: [
		'c++',
		'c',
		'c#',
		'java',
		'javascript',
		'typescript',
		'python',
		'dart',
		'php',
		'go',
	],
}

const Skills: NextPage = () => {
	const flexDirection = useBreakpointValue<ContainerProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})
	return (
		<React.Fragment>
			<Head>
				<title>About · hokkyss</title>
				<meta
					name="description"
					content="An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks."
				/>
			</Head>
			<Container
				gap="4"
				maxWidth="container.xl"
				centerContent
				flexDirection={flexDirection}
			>
				<Box width="full">
					<Heading marginBottom="4" className="tagged" textAlign="center">
						About Me
					</Heading>
					<UnderDevelopment />
				</Box>
				<Box width="full" flexDirection="column">
					<Heading marginBottom="4" textAlign="center" className="tagged">
						My Skills
					</Heading>
					<Collapse title="Programming Languages">
						{skills.languages.map((l) => (
							<Tag key={l} tag={l} />
						))}
					</Collapse>
					<Collapse title="Frameworks and Libraries">
						{skills.frameworks.map((f) => (
							<Tag key={f} tag={f} />
						))}
					</Collapse>
					<Collapse title="Databases">
						{skills.databases.map((d) => (
							<Tag key={d} tag={d} />
						))}
					</Collapse>
				</Box>
			</Container>
		</React.Fragment>
	)
}

export default Skills
