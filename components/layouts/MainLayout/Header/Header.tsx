import {
	Flex,
	HStack,
	LinkBox,
	LinkOverlay,
	Spacer,
	StackDivider,
	StackItem,
	Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import * as React from 'react'
import Link from 'next/link'

import { paths } from '~/lib/common'
import { useDrawer } from '~/hooks'

const navHeight = '72px'

const Header = React.memo(function Header() {
	const drawer = useDrawer()
	const { pathname } = useRouter()

	return (
		<React.Fragment>
			{/* use Drawer instead of Header */}
			{!drawer && (
				<Flex
					p="6"
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
										<LinkOverlay as={Link} href={path}>
											<Text
												color={
													(
														path === '/'
															? pathname === path
															: pathname.startsWith(path)
													)
														? 'teal.300'
														: 'current'
												}
											>
												{name}
											</Text>
										</LinkOverlay>
									</LinkBox>
								</StackItem>
								<StackDivider />
							</React.Fragment>
						))}
					</HStack>
					<Spacer />
				</Flex>
			)}
		</React.Fragment>
	)
})

export default Header
