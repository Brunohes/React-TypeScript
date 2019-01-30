// React
import * as React from 'react'

// Redux
import { connect } from 'react-redux'
import { store } from '../../../_store'
import {
	SaveUserAction,
	SaveAccessAction,
	SaveRefreshAction,
	LoadAction
} from '../../../_actions'

// Components
import { Loading } from '../../commons/Loading'
import ParticlePrimary from '../../commons/ParticlePrimary'
import { InputPrimary } from '../../commons/InputPrimary'

// Router
import { Redirect } from 'react-router-dom'

// Service
import { login } from '../../../_services/auth.service'

// Assets
import 'boxicons'

// Interfaces
import IStore from '../../../_models/Store'

// Interfaces
interface IProps extends IStore {}
interface IState {
	email: string
	password: string
	toForgotPassword: boolean
}

class Login extends React.Component<IProps, IState> {
	public state: IState = {
		email: '',
		password: '',
		toForgotPassword: false
	}

	public componentDidMount(): void {
		store.dispatch(SaveAccessAction(''))
		store.dispatch(SaveRefreshAction(''))
		store.dispatch(SaveUserAction(''))
		store.dispatch(LoadAction(false))
	}

	public _onSubmit = async event => {
		try {
			event.preventDefault()

			const { email, password } = this.state

			await login(email, password)

			// go to first page
			this.props.history.push('/panel')
		} catch (err) {}
	}

	public onChange = event => {
		this.setState({ [event.target.id]: event.target.value } as Pick<
			IState,
			keyof IState
		>)
	}

	public toForgotPassword = event => {
		event.preventDefault()
		this.setState({ toForgotPassword: true })
	}

	public render(): JSX.Element {
		const { isLoading } = this.props
		const { toForgotPassword } = this.state

		if (toForgotPassword === true) {
			return <Redirect to='/forgot-password' />
		}

		return (
			<>
				<ParticlePrimary />
				<section className='container-fluid login-component'>
					<div className='row'>
						<div className='col-12'>
							<section className='login'>
								<form
									style={{
										zIndex: 2
									}}
									className='row'
									onSubmit={this._onSubmit}
								>
									<div className='col-12'>
										<img
											style={{
												maxWidth: 275
											}}
											className='logo'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											autoComplete='new-password'
											id='email'
											type='text'
											value={this.state.email}
											onChange={this.onChange}
											label='e-mail'
											icon='at'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											autoComplete='new-password'
											id='password'
											type='password'
											value={this.state.password}
											onChange={this.onChange}
											label='password'
											icon='lock'
											iconType={'solid'}
										/>
									</div>
									{isLoading ? (
										<Loading isLoading={this.props.isLoading} />
									) : (
										<div className='col-12'>
											<button
												className='btn-primary'
												type='submit'
												value='Submit'
											>
												log-in
											</button>
										</div>
									)}
									<a
										onClick={this.toForgotPassword}
										className='link forgot-password'
									>
										forgot password
									</a>
								</form>
							</section>
						</div>
					</div>
				</section>
			</>
		)
	}
}

const mapStateToProps = store => ({
	isLoading: store.loadingState.isLoading,
	user: store.userState.user,
	access_token: store.userState.access_token,
	refresh_token: store.userState.refresh_token
})

export default connect(mapStateToProps)(Login)
