import * as React from 'react'

import { useBreakpointValue } from '~/hooks'

export const DrawerContext = React.createContext<boolean>(false)

export const DrawerProvider = React.memo<React.PropsWithChildren>(
	function DrawerProvider({ children }) {
		const breakpoint = useBreakpointValue({
			base: true,
			xs: false,
			sm: false,
			md: false,
			lg: false,
			xl: false,
			'2xl': false,
		})

		return (
			<DrawerContext.Provider value={breakpoint}>
				{children}
			</DrawerContext.Provider>
		)
	}
)
