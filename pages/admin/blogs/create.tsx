import {
	Button,
	Flex,
	FormLabel,
	Input,
	Textarea,
	chakra,
	FlexProps,
	useToast,
	UseToastOptions,
	ToastId,
} from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { withServerSideUser } from 'next-firebase-session-auth'
import Router from 'next/router'
import * as React from 'react'

import { FormControl } from '~/components/elements'
import { AdminLayout } from '~/components/layouts'
import Markdown from '~/components/modules/Markdown/Markdown'
import { useBreakpointValue } from '~/hooks'
import { createBlog } from '~/lib/client'
import { initializeFirebaseAdmin } from '~/lib/server'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AdminCreateBlog: NextPageWithLayout = () => {
	const toast = useToast()
	const toastIdRef = React.useRef<ToastId>()
	const flexDirection = useBreakpointValue<FlexProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})

	const updateToast = React.useCallback(
		(options: UseToastOptions) => {
			if (toastIdRef.current) {
				toast.update(toastIdRef.current, options)
			} else {
				toastIdRef.current = toast({
					...options,
					onCloseComplete: () => {
						toastIdRef.current = undefined
					},
				})
			}
		},
		[toast]
	)

	const [blog, setBlog] = React.useState<CreateBlogDto>({
		markdown: '',
		slug: '',
		subtitle: '',
		tags: [],
		title: '',
	})

	const onChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = React.useCallback((e) => {
		setBlog((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}, [])

	const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault()
			updateToast({
				title: 'Loading',
				status: 'loading',
			})
			createBlog(blog.markdown, blog.slug, blog.subtitle, blog.tags, blog.title)
				.then(() =>
					updateToast({
						status: 'success',
						description: 'Successfully created a blog! Redirecting...',
					})
				)
				.then(() => Router.replace('/admin/blogs'))
				.catch((e) =>
					updateToast({
						status: 'error',
						description: e.message || 'Internal Server Error',
					})
				)
		},
		[blog, updateToast]
	)

	return (
		<React.Fragment>
			<chakra.form
				display="flex"
				flexDir="column"
				onSubmit={onSubmit}
				p="4"
				gap="4"
				w="full"
			>
				<FormControl>
					<Input
						placeholder="Title"
						name="title"
						onChange={onChange}
						value={blog.title}
					/>
					<FormLabel>Title</FormLabel>
				</FormControl>
				<FormControl>
					<Input
						placeholder="Subtitle"
						name="subtitle"
						onChange={onChange}
						value={blog.subtitle}
					/>
					<FormLabel>Subtitle</FormLabel>
				</FormControl>
				<FormControl>
					<Input
						placeholder="Slug"
						name="slug"
						onChange={onChange}
						value={blog.slug}
					/>
					<FormLabel>Slug</FormLabel>
				</FormControl>
				<Flex display="flex" flexDir={flexDirection} gap="6" w="full" minH="36">
					<Flex flex="1">
						<Textarea
							name="markdown"
							value={blog.markdown}
							onChange={onChange}
							h="full"
							minH="full"
							placeholder="#Markdown Text"
						/>
					</Flex>
					<Flex
						flex="1"
						border="1px"
						borderColor="inherit"
						borderRadius="md"
						p="2"
					>
						<Markdown>{blog.markdown}</Markdown>
					</Flex>
				</Flex>
				<Button type="submit">Submit</Button>
			</chakra.form>
		</React.Fragment>
	)
}

AdminCreateBlog.getLayout = ({ ...userSession }: PageProps) => {
	return <AdminLayout {...userSession} />
}

export const getServerSideProps = withServerSideUser(async ({ isSignedIn }) => {
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
}, initializeFirebaseAdmin())

export default AdminCreateBlog
