import {
	Button,
	Flex,
	FlexProps,
	FormLabel,
	Input,
	Textarea,
	ToastId,
	useToast,
	UseToastOptions,
	chakra,
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
import { getOneBlog } from '~/lib/common'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AdminUpdateBlog: NextPageWithLayout<PageProps> = ({ blog }) => {
	const [newBlog, setNewBlog] = React.useState<Blog>(blog)
	const toast = useToast()
	const toastIdRef = React.useRef<ToastId>()

	const onChange = React.useCallback<
		React.ChangeEventHandler<HTMLTextAreaElement & HTMLInputElement>
	>((e) => {
		setNewBlog((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}, [])

	const updateToast = React.useCallback(
		(options: UseToastOptions) => {
			if (toastIdRef.current) {
				toast.update(toastIdRef.current, options)
			} else {
				toastIdRef.current = toast(options)
			}
		},
		[toast]
	)

	const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault()
			updateToast({
				title: 'Loading',
				status: 'loading',
			})
			createBlog(
				newBlog.markdown,
				newBlog.slug,
				blog.slug,
				newBlog.subtitle,
				newBlog.tags,
				newBlog.title
			)
				.then(() =>
					updateToast({
						status: 'success',
						description: 'Successfully created a blog! Redirecting...',
					})
				)
				.then(() => Router.replace('/admin/blogs'))
				.catch(() =>
					updateToast({
						status: 'error',
					})
				)
		},
		[blog.slug, newBlog, updateToast]
	)

	const flexDirection = useBreakpointValue<FlexProps['flexDirection']>({
		base: 'column',
		md: 'row',
	})

	return (
		<React.Fragment>
			<chakra.form
				display="flex"
				flexDir="column"
				onSubmit={onSubmit}
				p="4"
				gap="4"
			>
				<FormControl>
					<Input
						placeholder="Title"
						name="title"
						onChange={onChange}
						value={newBlog.title}
					/>
					<FormLabel>Title</FormLabel>
				</FormControl>
				<FormControl>
					<Input
						placeholder="Subtitle"
						name="subtitle"
						onChange={onChange}
						value={newBlog.subtitle}
					/>
					<FormLabel>Subtitle</FormLabel>
				</FormControl>
				<FormControl>
					<Input
						placeholder="Slug"
						name="slug"
						onChange={onChange}
						value={newBlog.slug}
					/>
					<FormLabel>Slug</FormLabel>
				</FormControl>
				<Flex display="flex" flexDir={flexDirection} gap="6" w="full">
					<Flex flex="1">
						<Textarea
							name="markdown"
							value={newBlog.markdown}
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
						<Markdown>{newBlog.markdown}</Markdown>
					</Flex>
				</Flex>
				<Button type="submit">Submit</Button>
			</chakra.form>
		</React.Fragment>
	)
}

AdminUpdateBlog.getLayout = ({ blog: _, ...userSession }: PageProps) => {
	return <AdminLayout {...userSession} />
}

export const getServerSideProps = withServerSideUser<{ blog: Blog }>(
	async (ctx) => {
		if (
			!ctx.params ||
			!ctx.params.slug ||
			typeof ctx.params.slug !== 'string'
		) {
			return {
				notFound: true,
			}
		}

		const slug = ctx.params.slug
		const blog = await getOneBlog(slug)
		if (!blog) {
			return {
				notFound: true,
			}
		}

		return {
			props: {
				blog: blog,
			},
		}
	}
)

export default AdminUpdateBlog
