import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import {
	Code,
	Divider,
	Heading,
	Img as Image,
	Kbd,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
} from '@chakra-ui/react'
import remarkGemoji from 'remark-gemoji'
import remarkEmoji from 'remark-emoji'

const Markdown = React.memo<{ children: string }>(function Markdown({
	children,
}) {
	return (
		<ReactMarkdown
			skipHtml
			linkTarget="_blank"
			remarkPlugins={[remarkGfm, remarkGemoji, remarkEmoji]}
			rehypePlugins={[]}
			remarkRehypeOptions={{}}
			components={{
				a: ({ children, href, className }) =>
					href ? (
						<Link className={className} href={href}>
							{children}
						</Link>
					) : (
						<Text className={className}>{children}</Text>
					),
				abbr: ({ children, className }) => (
					<Text className={className} as="abbr">
						{children}
					</Text>
				),
				b: ({ children, className }) => (
					<Text className={className} as="b">
						{children}
					</Text>
				),
				blockquote: ({ children, className }) => (
					<Text className={className} as="blockquote" p="2">
						{children}
					</Text>
				),
				code: ({ children, className }) => (
					<Code className={className} p="2">
						{children}
					</Code>
				),
				cite: ({ children, className }) => (
					<Text className={className} as="cite">
						{children}
					</Text>
				),
				del: ({ children, className }) => (
					<Text className={className} as="del">
						{children}
					</Text>
				),
				i: ({ children, className }) => (
					<Text className={className} as="i">
						{children}
					</Text>
				),
				u: ({ children, className }) => (
					<Text className={className} as="u">
						{children}
					</Text>
				),
				img: ({ src, alt, className }) =>
					src && alt ? (
						<Image className={className} display="inline" src={src} alt={alt} />
					) : (
						<React.Fragment />
					),
				h1: ({ children, className }) => (
					<React.Fragment>
						<Heading
							className={className}
							mt="4"
							mb="2"
							as="h1"
							size="2xl"
							fontWeight="semibold"
						>
							{children}
						</Heading>
						<Divider mb="4" />
					</React.Fragment>
				),
				h2: ({ children, className }) => (
					<React.Fragment>
						<Heading
							className={className}
							mt="4"
							mb="2"
							as="h2"
							size="xl"
							fontWeight="semibold"
						>
							{children}
						</Heading>
						<Divider mb="4" />
					</React.Fragment>
				),
				h3: ({ children, className }) => (
					<Heading
						className={className}
						my="4"
						as="h3"
						size="lg"
						fontWeight="semibold"
					>
						{children}
					</Heading>
				),
				h4: ({ children, className }) => (
					<Heading
						className={className}
						my="4"
						as="h4"
						size="md"
						fontWeight="medium"
					>
						{children}
					</Heading>
				),
				h5: ({ children, className }) => (
					<Heading
						className={className}
						my="4"
						as="h5"
						size="sm"
						fontWeight="medium"
					>
						{children}
					</Heading>
				),
				h6: ({ children, className }) => (
					<Heading
						className={className}
						my="4"
						as="h6"
						size="xs"
						fontWeight="medium"
					>
						{children}
					</Heading>
				),
				p: ({ children, className }) => (
					<Text className={className} mb="2" as="p">
						{children}
					</Text>
				),
				strong: ({ children, className }) => (
					<Text className={className} as="strong">
						{children}
					</Text>
				),
				kbd: ({ children, className }) => (
					<Kbd className={className}>{children}</Kbd>
				),
				mark: ({ children, className }) => (
					<Text className={className} as="mark">
						{children}
					</Text>
				),
				ol: ({ children, className }) => (
					<OrderedList spacing="2" pl="4" className={className}>
						{children}
					</OrderedList>
				),
				ul: ({ children, className }) => (
					<UnorderedList spacing="2" pl="4" className={className}>
						{children}
					</UnorderedList>
				),
				li: ({ children, className }) => (
					<ListItem className={className}>{children}</ListItem>
				),
				hr: ({ children, className }) => (
					<Divider className={className}>{children}</Divider>
				),
				em: ({ children, className }) => (
					<Text className={className} as="em">
						{children}
					</Text>
				),
				ins: ({ children, className }) => (
					<Text className={className} as="ins">
						{children}
					</Text>
				),
				s: ({ children, className }) => (
					<Text className={className} as="s">
						{children}
					</Text>
				),
				samp: ({ children, className }) => (
					<Text className={className} as="samp">
						{children}
					</Text>
				),
				sub: ({ children, className }) => (
					<Text className={className} as="sub">
						{children}
					</Text>
				),
				sup: ({ children, className }) => (
					<Text className={className} as="sup">
						{children}
					</Text>
				),
			}}
		>
			{children}
		</ReactMarkdown>
	)
})

export default Markdown
