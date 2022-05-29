import * as React from 'react'
import { Heading, Icon, LinkOverlay, Spacer, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { Card } from '~/elements'
import {
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaTelegramPlane,
	FaWhatsapp,
} from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { IconType } from 'react-icons'

type Socials =
	| 'whatsapp'
	| 'gmail'
	| 'telegram'
	| 'github'
	| 'linkedin'
	| 'instagram'
type ContactCardProps = {
	contact: Socials
}

const icon: Record<Socials, IconType> = {
	whatsapp: FaWhatsapp,
	gmail: SiGmail,
	telegram: FaTelegramPlane,
	github: FaGithub,
	linkedin: FaLinkedin,
	instagram: FaInstagram,
}

const href: Record<Socials, string> = {
	whatsapp: 'https://wa.me/6289675463323',
	gmail: 'mailto:hokkyss2@gmail.com',
	telegram: '',
	github: 'https://github.com/hokkyss',
	linkedin: 'https://www.linkedin.com/in/hokkyss',
	instagram: 'https://www.instagram.com/hokkyss/',
}

const title: Record<Socials, string> = {
	whatsapp: 'Whatsapp',
	gmail: 'Gmail',
	telegram: 'Telegram',
	github: 'Github',
	linkedin: 'Linkedin',
	instagram: 'Instagram',
}

const subtitle: Record<Socials, string> = {
	whatsapp: '+62 896 7546 3323',
	gmail: 'hokkyss2@gmail.com',
	telegram: 'Text me',
	github: 'hokkyss',
	linkedin: 'hokkyss',
	instagram: 'hokkyss',
}

export const ContactCard = React.memo(function ContactCard(
	props: ContactCardProps
) {
	const { contact } = props

	return (
		<Card
			textAlign="justify"
			as="article"
			margin="2"
			_hover={{ textColor: 'teal.300' }}
			borderTopColor={contact}
			borderTopWidth="thick"
		>
			<Heading
				size="md"
				noOfLines={2}
				alignItems="center"
				justifyContent="center"
			>
				<Icon as={icon[contact]} marginRight="2" alignItems="center" />
				<NextLink href={href[contact]} passHref>
					<LinkOverlay target="_blank">{title[contact]}</LinkOverlay>
				</NextLink>
			</Heading>
			<Spacer height="4" />
			<Text fontSize="md" noOfLines={2} color="gray.500">
				{subtitle[contact]}
			</Text>
		</Card>
	)
})
