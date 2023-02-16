import * as React from 'react'

import { DrawerContext } from '~/components/context'

export const useDrawer = () => React.useContext(DrawerContext)
