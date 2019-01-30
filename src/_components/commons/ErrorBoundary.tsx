import * as React from 'react'

interface IState {
	hasError: boolean
}
interface IProps {
	children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	public componentDidCatch(error: any, info: any): void {
		// Display fallback UI
		this.setState({ hasError: true })
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info)
		// console.log(error, info)
	}

	public render(): React.ReactNode {
		const { hasError } = this.state

		const { children } = this.props

		if (hasError) {
			// You can render any custom fallback UI
			return (
				<div className='boundary-error'>
					<h1>Desculpe, Algo deu errado :(</h1>
				</div>
			)
		}

		return children
	}
}
