import * as React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Collapse, Tag } from '~/components/elements'
import { Box, Container, ContainerProps, Heading, Text } from '@chakra-ui/react'
import { useBreakpointValue } from '~/hooks'

const skills: Skill = {
	databases: ['mysql', 'postgresql', 'mariadb'],
	frameworks: [
		'nodejs',
		'express',
		'react',
		'nextjs',
		'tailwindcss',
		'chakra',
		'flask',
		'django',
		'prisma',
		'flutter',
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
	others: ['firebase'],
}

const Skills: NextPage = () => {
	const flexDirection = useBreakpointValue<ContainerProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})

	return (
		<React.Fragment>
			<Head>
				<title>About · Hokki Suwanda</title>
				<meta
					name="description"
					content="An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks."
				/>
			</Head>
			<Container
				gap="8"
				maxWidth="container.xl"
				centerContent
				flexDirection={flexDirection}
				padding="8"
			>
				<Box width="full">
					<Heading marginBottom="4" className="tagged" textAlign="center">
						Me &amp; Myself
					</Heading>
					<Text fontSize="lg" fontFamily="body">
						Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer
						from Indonesia. I currently am a penultimate student majoring in
						Informatics/Computer Science in Bandung Institute of Technology.
					</Text>
					<Text fontSize="lg" fontFamily="body" marginTop="6">
						Very excited to learn new technologies and frameworks. An organized
						and well managed person. Confident in my time management, teamwork,
						and professional capabilities. Have used quite lot of tech stacks.
					</Text>
				</Box>
				<Box width="full" flexDirection="column">
					<Heading marginBottom="4" textAlign="center" className="tagged">
						My Skills
					</Heading>
					<Collapse title="Programming Languages">
						{/* {skills.languages.map((l) => (
							<Tag key={l} tag={l} />
						))} */}
					</Collapse>
					<Collapse title="Frameworks and Libraries">
						{/* {skills.frameworks.map((f) => (
							<Tag key={f} tag={f} />
						))} */}
					</Collapse>
					<Collapse title="Databases">
						{/* {skills.databases.map((d) => (
							<Tag key={d} tag={d} />
						))} */}
					</Collapse>
					<Collapse title="Others">
						{/* {skills.others.map((d) => (
							<Tag key={d} tag={d} />
						))} */}
					</Collapse>
				</Box>
			</Container>
		</React.Fragment>
	)
}

export default Skills
