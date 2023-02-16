import * as React from 'react'

import Error from '~/pages/_error'

export class ErrorBoundary extends React.Component<{
	children: React.ReactNode
}> {
	state: Readonly<{ hasError: boolean; error: unknown }> = {
		hasError: false,
		error: null,
	}

	static getDerivedStateFromError(error: unknown) {
		return {
			hasError: true,
			error,
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	componentDidCatch(error: any, errorInfo: any) {
		// do nothing
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return <Error />
		}
		return this.props.children
	}
}
