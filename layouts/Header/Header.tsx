import {
	Button,
	Flex,
	HStack,
	LinkBox,
	LinkOverlay,
	Spacer,
	StackDivider,
	StackItem,
	Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

import { loginPath, paths } from '~/constants/paths'
import { useBreakpoint } from '~/hooks'

export const Header = React.memo(function Header({ children }) {
	const { pathname } = useRouter()
	const breakpoint = useBreakpoint()

	return breakpoint === 'base' || pathname === loginPath.path ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<React.Fragment>
			<Flex
				paddingY="6"
				paddingX="6"
				bgColor="blackAlpha.900"
				borderBottomColor="gray.300"
				borderBottomWidth="thin"
				textColor="white"
				fontWeight="semibold"
			>
				<HStack spacing="4">
					{Object.values(paths).map(({ path, name }) => (
						<React.Fragment key={path}>
							<StackItem>
								<LinkBox>
									<Text _hover={{ textDecoration: 'underline' }}>
										<NextLink href={path} passHref>
											<LinkOverlay>{name}</LinkOverlay>
										</NextLink>
									</Text>
								</LinkBox>
							</StackItem>
							<StackDivider />
						</React.Fragment>
					))}
				</HStack>
			</Flex>
			{children}
		</React.Fragment>
	)
})
