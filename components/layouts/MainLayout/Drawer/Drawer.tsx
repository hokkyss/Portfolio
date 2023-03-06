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
	Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'

import { useDrawer } from '~/hooks'
import { paths } from '~/lib/common'
// import { SocialMedia } from '~/layouts'

export const Drawer = React.memo(function Drawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const drawer = useDrawer()
	const { pathname } = useRouter()

	return (
		<React.Fragment>
			{drawer && (
				<React.Fragment>
					<Portal>
						<IconButton
							position="fixed"
							width="14"
							height="14"
							right="8"
							bottom="8"
							colorScheme="blue"
							borderRadius="full"
							zIndex="docked"
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
								<Flex flexDirection="column">
									<Divider />
									{Object.values(paths).map(({ path, name }) => (
										<React.Fragment key={path}>
											<Box textAlign="center" onClick={onClose}>
												<LinkBox>
													<LinkOverlay href={path} as={NextLink}>
														<Text
															color={path === pathname ? 'teal.300' : 'current'}
															p="2"
														>
															{name}
														</Text>
														<Divider />
													</LinkOverlay>
												</LinkBox>
											</Box>
											<Spacer />
										</React.Fragment>
									))}
									{/* <Center marginTop="4">
										<SocialMedia />
									</Center> */}
								</Flex>
							</DrawerBody>
						</DrawerContent>
					</ChakraDrawer>
				</React.Fragment>
			)}
		</React.Fragment>
	)
})
