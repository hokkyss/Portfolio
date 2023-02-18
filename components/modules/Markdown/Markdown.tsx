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

export const Markdown = React.memo<{ children: string }>(function Markdown({
	children,
}) {
	return (
		<ReactMarkdown
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
					<Text className={className} as="blockquote">
						{children}
					</Text>
				),
				code: ({ children, className }) => (
					<Code className={className}>{children}</Code>
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
					<Heading className={className} as="h1" size="2xl">
						{children}
					</Heading>
				),
				h2: ({ children, className }) => (
					<Heading className={className} as="h2" size="xl">
						{children}
					</Heading>
				),
				h3: ({ children, className }) => (
					<Heading className={className} as="h3" size="lg">
						{children}
					</Heading>
				),
				h4: ({ children, className }) => (
					<Heading className={className} as="h4" size="md">
						{children}
					</Heading>
				),
				h5: ({ children, className }) => (
					<Heading className={className} as="h5" size="sm">
						{children}
					</Heading>
				),
				h6: ({ children, className }) => (
					<Heading className={className} as="h6" size="xs">
						{children}
					</Heading>
				),
				p: ({ children, className }) => (
					<Text className={className} my="1" as="p">
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
					<OrderedList className={className}>{children}</OrderedList>
				),
				ul: ({ children, className }) => (
					<UnorderedList className={className}>{children}</UnorderedList>
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
			remarkPlugins={[remarkGfm]}
			linkTarget="_blank"
			skipHtml
		>
			{children}
		</ReactMarkdown>
	)
})
