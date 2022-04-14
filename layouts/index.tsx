import * as React from 'react'

import { Drawer } from './Drawer/Drawer'
import { Header } from './Header/Header'

export const Layout = React.memo(function Layout({ children }) {
	return (
		<Drawer>
			<Header>{children}</Header>
		</Drawer>
	)
})
