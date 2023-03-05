import * as React from 'react'
import { HStack, Icon, LinkBox, LinkOverlay, StackItem } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const socialMedias = [
	{ href: 'https://www.linkedin.com/in/hokkyss', as: FaLinkedin },
	{ href: 'https://github.com/hokkyss', as: FaGithub },
	{ href: 'https://www.instagram.com/hokkyss/', as: FaInstagram },
]

export const SocialMedia = React.memo(function SocialMedia() {
	return (
		<HStack spacing="6" alignItems="center" justifyContent="center">
			{socialMedias.map(({ href, as }) => (
				<StackItem key={href}>
					<LinkBox height="5" width="5" _hover={{ color: 'teal.300' }}>
						<LinkOverlay href={href} target="_blank" as={NextLink}>
							<Icon height="5" width="5" as={as} />
						</LinkOverlay>
					</LinkBox>
				</StackItem>
			))}
		</HStack>
	)
})
