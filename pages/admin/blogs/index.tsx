import {
	Box,
	Button,
	Heading,
	IconButton,
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
import Router from 'next/router'
import * as React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

import { AdminLayout } from '~/components/layouts'
import { deleteBlog } from '~/lib/client'
import { formatDateTime, getBlogs } from '~/lib/common'
import { initializeFirebaseAdmin } from '~/lib/server'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AdminBlogView: NextPageWithLayout<PageProps> = ({ blogs }) => {
	return (
		<Box w="fit-content" mx="auto">
			<Heading as="h1" textAlign="center" p="6">
				Resources
			</Heading>
			<TableContainer>
				<Button as={Link} href="/admin/blogs/create" w="full">
					Create
				</Button>
				<Table>
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>Title</Th>
							<Th>Slug</Th>
							<Th>Last Updated</Th>
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{blogs.map((blog, index) => (
							<Tr key={blog.slug}>
								<Td>{index + 1}</Td>
								<Td>{blog.title}</Td>
								<Td>{blog.slug}</Td>
								<Td>{formatDateTime(blog.updatedAt)}</Td>
								<Td gap="2">
									<IconButton
										aria-label="Edit"
										colorScheme="green"
										icon={<MdEdit />}
										as={Link}
										href={`/admin/blogs/${blog.slug}`}
									/>
									<IconButton
										aria-label="Delete"
										colorScheme="red"
										icon={<MdDelete />}
										onClick={() =>
											deleteBlog(blog.slug)
												.then(() => Router.replace(Router.asPath))
												.catch(() => null)
										}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
					<Tfoot></Tfoot>
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
