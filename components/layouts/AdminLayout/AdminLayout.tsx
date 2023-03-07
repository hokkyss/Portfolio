import * as React from 'react'
import { UserSession } from 'next-firebase-session-auth'
import {
	Box,
	Flex,
	HStack,
	LinkBox,
	LinkOverlay,
	Mark,
	StackItem,
	Text,
} from '@chakra-ui/react'
import Link from 'next/link'

export const AdminLayout = React.memo<React.PropsWithChildren<UserSession>>(
	function AdminLayout({ children, user, isSignedIn }) {
		if (!isSignedIn) {
			return null
		}

		return (
			<Flex
				p="6"
				bgColor="blackAlpha.900"
				fontWeight="semibold"
				as="nav"
				h="72px"
				w="full"
				flexDir="row-reverse"
				justifyContent="space-between"
			>
				<LinkBox _hover={{ textDecoration: 'underline' }}>
					<LinkOverlay as={Link} href="/logout">
						<Text color="red.500">Logout</Text>
					</LinkOverlay>
				</LinkBox>
				<Text>
					Signed in as <Mark color="yellow">{user.email}</Mark>
				</Text>
				<Box></Box>
			</Flex>
		)
	}
)
