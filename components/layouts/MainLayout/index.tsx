import * as React from 'react'
import { DrawerProvider } from '~/components/context'

import { Drawer } from './Drawer/Drawer'
import { Header } from './Header/Header'

export const MainLayout = React.memo<React.PropsWithChildren>(
	function MainLayout({ children }) {
		return (
			<DrawerProvider>
				<Drawer>
					<Header>{children}</Header>
				</Drawer>
			</DrawerProvider>
		)
	}
)

export * from './SocialMedia/SocialMedia'
