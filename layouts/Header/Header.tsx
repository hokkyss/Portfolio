import {
	Flex,
	HStack,
	Icon,
	LinkBox,
	LinkOverlay,
	Spacer,
	StackDivider,
	StackItem,
	Switch,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

import { loginPath, paths } from '~/constants/paths'
import { useBreakpoint } from '~/hooks'

export const Header = React.memo(function Header({ children }) {
	const { pathname } = useRouter()
	const breakpoint = useBreakpoint()
	const { toggleColorMode, colorMode } = useColorMode()
	const bgColor = useColorModeValue('gray.200', 'blackAlpha.900')

	return breakpoint === 'base' || pathname === loginPath.path ? (
		<React.Fragment>{children}</React.Fragment>
	) : (
		<React.Fragment>
			<Flex paddingY="6" paddingX="6" bgColor={bgColor} fontWeight="semibold">
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
				<Spacer />
				<HStack spacing="4">
					<Switch onChange={toggleColorMode} />
					{colorMode === 'dark' ? (
						<Icon as={MdDarkMode} />
					) : (
						<Icon as={MdLightMode} />
					)}
				</HStack>
			</Flex>
			{children}
		</React.Fragment>
	)
})
