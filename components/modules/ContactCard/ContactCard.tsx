import * as React from 'react'
import { Heading, Icon, LinkOverlay, Spacer, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { Card } from '~/components/elements'
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
	whatsapp: 'https://link.hokkyss.com/whatsapp',
	gmail: 'https://link.hokkyss.com/mail-me',
	telegram: '',
	github: 'https://link.hokkyss.com/github',
	linkedin: 'https://link.hokkyss.com/linkedin',
	instagram: 'https://link.hokkyss.com/ig',
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
			_hover={{ textColor: 'teal.300' }}
			borderTopColor={[contact]}
		>
			<Heading
				size="md"
				noOfLines={2}
				alignItems="center"
				justifyContent="center"
			>
				<Icon as={icon[contact]} marginRight="2" alignItems="center" />
				<LinkOverlay href={href[contact]} target="_blank" as={NextLink}>
					{title[contact]}
				</LinkOverlay>
			</Heading>
			<Spacer height="4" />
			<Text fontSize="md" noOfLines={2} color="gray.500">
				{subtitle[contact]}
			</Text>
		</Card>
	)
})
