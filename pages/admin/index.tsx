import {
	Box,
	Heading,
	LinkBox,
	LinkOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { withServerSideUser } from 'next-firebase-session-auth'
import Link from 'next/link'
import * as React from 'react'

import { AdminLayout } from '~/components/layouts'
import { initializeFirebaseAdmin } from '~/lib/server'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AdminHomepage: NextPageWithLayout<PageProps> = () => {
	return (
		<Box w="container.sm" mx="auto">
			<Heading as="h1" textAlign="center" p="6">
				Resources
			</Heading>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>Component</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>1</Td>
							<LinkBox _hover={{ textDecor: 'underline' }} as={Td}>
								<LinkOverlay as={Link} href="/admin/blogs">
									Blogs
								</LinkOverlay>
							</LinkBox>
						</Tr>
						<Tr>
							<Td>2</Td>
							<LinkBox _hover={{ textDecor: 'underline' }} as={Td}>
								<LinkOverlay as={Link} href="/admin/projects">
									Projects
								</LinkOverlay>
							</LinkBox>
						</Tr>
					</Tbody>
					<Tfoot></Tfoot>
				</Table>
			</TableContainer>
		</Box>
	)
}

AdminHomepage.getLayout = (props: PageProps) => {
	return <AdminLayout {...props} />
}

export const getServerSideProps = withServerSideUser(
	async ({ isSignedIn, user, ...ctx }) => {
		if (!isSignedIn) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			}
		}

		return {
			props: {},
		}
	},
	initializeFirebaseAdmin()
)

export default AdminHomepage
