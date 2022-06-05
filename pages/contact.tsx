import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'

import { ContactCard } from '~/modules'

const ContactPage: NextPage = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Contact · Hokki Suwanda</title>
				<meta
					name="description"
					content="Contact hokkyss (Hokki Suwanda) through github, linkedin, instagram, whatsapp, and email"
				/>
			</Head>
			<Flex direction="row" wrap="wrap" justifyContent="center">
				<ContactCard contact="github" />
				<ContactCard contact="linkedin" />
				<ContactCard contact="instagram" />
				<ContactCard contact="whatsapp" />
				<ContactCard contact="gmail" />
			</Flex>
		</React.Fragment>
	)
}

export default ContactPage
