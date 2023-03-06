import dynamic from 'next/dynamic'
import * as React from 'react'
import { DrawerProvider } from '~/components/context'

import { Drawer } from './Drawer/Drawer'
import HeaderSkeleton from './Header/HeaderSkeleton'

const Header = dynamic(() => import('./Header/Header'), {
	loading: () => <HeaderSkeleton />,
})

const MainLayout = React.memo(function MainLayout() {
	return (
		<DrawerProvider>
			<Drawer />
			<Header />
		</DrawerProvider>
	)
})

export default MainLayout
