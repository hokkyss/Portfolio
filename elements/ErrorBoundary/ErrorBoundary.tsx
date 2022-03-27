import * as React from 'react'

export default class ErrorBoundary extends React.Component<{
	fallback: React.ReactNode
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

	render(): React.ReactNode {
		if (this.state.hasError) {
			return this.props.fallback
		}
		return this.props.children
	}
}
