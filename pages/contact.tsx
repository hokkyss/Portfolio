import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'

import MainLayout from '~/components/layouts/MainLayout'
import BlogCardSkeleton from '~/components/modules/BlogCard/BlogCardSkeleton'

const ContactCard = dynamic(
	() => import('~/components/modules/ContactCard/ContactCard'),
	{
		'loading': () => <BlogCardSkeleton />
	}
)

const ContactPage: NextPageWithLayout = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Contact · Hokki Suwanda</title>
				<meta
					name="description"
					content="Contact hokkyss (Hokki Suwanda) through github, linkedin, instagram, whatsapp, and email"
				/>
			</Head>
			<Flex direction="row" wrap="wrap" alignItems="center" justify="center">
				<ContactCard contact="github" />
				<ContactCard contact="linkedin" />
				<ContactCard contact="instagram" />
				<ContactCard contact="whatsapp" />
				<ContactCard contact="gmail" />
			</Flex>
		</React.Fragment>
	)
}

ContactPage.getLayout = function getContactPageLayout() {
	return <MainLayout />
}

export default ContactPage
