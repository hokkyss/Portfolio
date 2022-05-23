import {
	Box,
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

import { paths } from '~/constants/paths'
import { useDrawer } from '~/hooks'
import { SocialMedia } from '~/layouts'

const navHeight = '72px'

export const Header = React.memo(function Header({ children }) {
	const drawer = useDrawer()
	const { pathname } = useRouter()

	return (
		<React.Fragment>
			{/* use Drawer instead of Header */}
			{!drawer && (
				<Flex
					paddingY="6"
					paddingX="6"
					bgColor="blackAlpha.900"
					fontWeight="semibold"
					as="nav"
					height={navHeight}
				>
					<HStack spacing="4">
						{Object.values(paths).map(({ path, name }) => (
							<React.Fragment key={path}>
								<StackItem>
									<LinkBox _hover={{ textDecoration: 'underline' }}>
										<NextLink href={path} passHref>
											<LinkOverlay>
												<Text
													color={pathname === path ? 'teal.300' : 'current'}
												>
													{name}
												</Text>
											</LinkOverlay>
										</NextLink>
									</LinkBox>
								</StackItem>
								<StackDivider />
							</React.Fragment>
						))}
					</HStack>
					<Spacer />
					<SocialMedia />
				</Flex>
			)}
			<Box height={drawer ? '100vh' : `calc(100vh - ${navHeight})`}>
				{children}
			</Box>
		</React.Fragment>
	)
})
