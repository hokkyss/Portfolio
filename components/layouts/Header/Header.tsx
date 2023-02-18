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
import { useRouter } from 'next/router'
import * as React from 'react'

import { paths } from '~/constants/paths'
import { useDrawer } from '~/hooks'

const navHeight = '72px'

export const Header = React.memo<React.PropsWithChildren>(function Header({
	children,
}) {
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
										<LinkOverlay href={path}>
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
			<Box height={drawer ? '100vh' : `calc(100vh - ${navHeight})`}>
				{children}
			</Box>
		</React.Fragment>
	)
})
