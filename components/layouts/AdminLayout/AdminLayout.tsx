import * as React from 'react'

export const AdminLayout = React.memo<React.PropsWithChildren>(
	function AdminLayout({ children }) {
		return <React.Fragment>{children}</React.Fragment>
	}
)
