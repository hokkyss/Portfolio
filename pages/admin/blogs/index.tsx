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
import { formatDateTime, getBlogs } from '~/lib/common'
import { initializeFirebaseAdmin } from '~/lib/server'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AdminBlogView: NextPageWithLayout<PageProps> = ({ blogs }) => {
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
							<Th>Title</Th>
							<Th>Slug</Th>
							<Th>Last Updated</Th>
						</Tr>
					</Thead>
					<Tbody>
						{blogs.map((blog, index) => (
							<Tr key={blog.slug}>
								<LinkBox _hover={{ textDecor: 'underline' }} as={Td}>
									<LinkOverlay as={Link} href={`/admin/blogs/${blog.slug}`}>
										{index + 1}
									</LinkOverlay>
								</LinkBox>
								<LinkBox _hover={{ textDecor: 'underline' }} as={Td}>
									<LinkOverlay as={Link} href={`/admin/blogs/${blog.slug}`}>
										{blog.title}
									</LinkOverlay>
								</LinkBox>
								<LinkBox _hover={{ textDecor: 'underline' }} as={Td}>
									<LinkOverlay as={Link} href={`/admin/blogs/${blog.slug}`}>
										{blog.slug}
									</LinkOverlay>
								</LinkBox>
								<Td>{formatDateTime(blog.updatedAt)}</Td>
							</Tr>
						))}
					</Tbody>
					<Tfoot>
						{/* <Tr>
							<Th>No</Th>
							<Th>Title</Th>
							<Th>Slug</Th>
							<Th>Last Updated</Th>
						</Tr> */}
					</Tfoot>
				</Table>
			</TableContainer>
		</Box>
	)
}

AdminBlogView.getLayout = ({ blogs: _, ...userSession }: PageProps) => {
	return <AdminLayout {...userSession} />
}

export const getServerSideProps = withServerSideUser<{ blogs: Blog[] }>(
	async ({ isSignedIn }) => {
		if (!isSignedIn) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			}
		}

		const blogs = await getBlogs()

		return {
			props: {
				blogs: blogs,
			},
		}
	},
	initializeFirebaseAdmin()
)

export default AdminBlogView
