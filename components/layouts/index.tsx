import * as React from 'react'
import { DrawerProvider } from '~/components/context'

import { Drawer } from './Drawer/Drawer'
import { Header } from './Header/Header'

export const Layout = React.memo(function Layout({ children }) {
	return (
		<DrawerProvider>
			<Drawer>
				<Header>{children}</Header>
			</Drawer>
		</DrawerProvider>
	)
})

export * from './SocialMedia/SocialMedia'
