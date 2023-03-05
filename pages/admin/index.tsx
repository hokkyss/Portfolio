import * as React from 'react'
import { AdminLayout } from '~/components/layouts'

const AdminHomepage: NextPageWithLayout = () => {
	return <React.Fragment>This is Admin Homepage</React.Fragment>
}

AdminHomepage.getLayout = function getAdminHomepageLayout(page) {
	return <AdminLayout>{page}</AdminLayout>
}
