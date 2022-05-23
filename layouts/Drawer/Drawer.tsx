import * as React from 'react'
import {
	useDisclosure,
	Drawer as ChakraDrawer,
	DrawerOverlay,
	Portal,
	DrawerContent,
	Text,
	DrawerBody,
	Box,
	IconButton,
	Icon,
	LinkBox,
	LinkOverlay,
	Spacer,
	Divider,
	Avatar,
	Center,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'

import { useBreakpoint } from '~/hooks'
import { paths } from '~/constants/paths'

export const Drawer = React.memo(function Drawer({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const breakpoint = useBreakpoint()
	const { pathname } = useRouter()

	return (
		<Box width="100vw" height="100vh">
			{breakpoint === 'base' && (
				<React.Fragment>
					<Portal>
						<IconButton
							position="absolute"
							width="16"
							height="16"
							right="8"
							bottom="8"
							colorScheme="blue"
							borderRadius="full"
							onClick={onOpen}
							icon={<Icon as={GiHamburgerMenu} width="6" height="6" />}
							aria-label="floating-action-menu"
						/>
					</Portal>
					<ChakraDrawer
						placement="right"
						isOpen={isOpen}
						onClose={onClose}
						colorScheme="black"
					>
						<DrawerOverlay />
						<DrawerContent>
							<Center marginTop="8" marginBottom="8">
								<Avatar
									src="me.png"
									size="2xl"
									aria-details="My photo"
									aria-readonly
								/>
							</Center>
							<DrawerBody p="0">
								<Box>
									<Divider />
									{Object.values(paths).map(({ path, name }) => (
										<React.Fragment key={path}>
											<Box textAlign="center">
												<LinkBox>
													<NextLink href={path} passHref>
														<LinkOverlay>
															<Text
																color={
																	path === pathname ? 'teal.300' : 'current'
																}
																p="2"
															>
																{name}
															</Text>
															<Divider />
														</LinkOverlay>
													</NextLink>
												</LinkBox>
											</Box>
											<Spacer />
										</React.Fragment>
									))}
								</Box>
							</DrawerBody>
						</DrawerContent>
					</ChakraDrawer>
				</React.Fragment>
			)}
			{children}
		</Box>
	)
})
