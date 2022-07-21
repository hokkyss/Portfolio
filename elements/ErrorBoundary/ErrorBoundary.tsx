import * as React from 'react'

import Error from '~/pages/_error'
import { HttpError } from '~/utils/error'

export class ErrorBoundary extends React.Component {
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
			if (this.state.error instanceof HttpError) {
				return <Error statusCode={this.state.error.statusCode} />
			}
			return <Error />
		}
		return this.props.children
	}
}
