import * as React from 'react'

// Libs
import { DebounceInput } from 'react-debounce-input'
import 'boxicons'

// Services
import {
	getUserByResetToken,
	changePassword
} from '../../../_services/auth.service'

// Helpers
import Helper from '../../../_helpers/Helper'

// Components
import { Loading } from '../../commons/Loading'
import { InputPrimary } from '../../commons/InputPrimary'

// Redux
import { connect } from 'react-redux'
import { store } from '../../../_store'
import { bindActionCreators } from 'redux'
import {
	SaveUserAction,
	SaveAccessAction,
	SaveRefreshAction
} from '../../../_actions'

// Models
import IStore from '../../../_models/Store'
import { Message } from '../../commons/Message'
import ParticlePrimary from '../../commons/ParticlePrimary'
import IUser from '../../../_models/User'

const mapStateToProps = store => ({
	isLoading: store.loadingState.isLoading
})

// Interfaces
interface IProps extends IStore {}
interface IState {
	form: {
		new_password: string;
		check_password: string;
	}
	reset_token: string
	user: IUser
}

class RecoverPassword extends React.Component<IProps, IState> {
	public state: IState = {
		form: {
			new_password: '',
			check_password: ''
		},
		reset_token: this.props.location.search.split('?')[1],
		user: {
			email: '',
			name: ''
		}
	}

	public async componentDidMount(): Promise<void> {
		try {
			const user: IUser = await getUserByResetToken(this.state.reset_token)

			console.log(user)

			this.setState({
				user: { ...this.state.user, email: user.email, name: user.name }
			})
		} catch (err) {
			this.props.history.push('/login')
		}
	}

	private onSubmit = async (event: React.FormEvent): Promise<void> => {
		try {
			event.preventDefault()
			const { reset_token, form } = this.state

			const content = await changePassword({
				reset_token,
				password: form.check_password
			})

			// Não retorna usuário mais

			// store.dispatch(SaveUserAction(content.user))
			// store.dispatch(SaveAccessAction(content.access_token))
			// store.dispatch(SaveRefreshAction(content.refresh_token))
			this.props.history.push('/login')
		} catch (err) {}
	}

	private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			form: { ...this.state.form, [event.target.id]: event.target.value }
		})
	}

	private checkPassword(): boolean {
		const { new_password, check_password } = this.state.form

		if (check_password.length !== 0) {
			const isTrue: boolean = Helper.checkPassword(
				new_password,
				check_password
			)
			if (!isTrue) {
				return true
			}

			return false
		}

		return false
	}

	private checkPasswordForm(): boolean {
		const { new_password, check_password } = this.state.form
		const errors = {
			newPassword: new_password.trim().length === 0,
			checkPassword: !Helper.checkPassword(new_password, check_password)
		}
		const isDisabled: boolean = Object.keys(errors).some(x => errors[x])

		return isDisabled
	}

	public render(): JSX.Element {
		const { isLoading } = this.props

		const { form, user } = this.state

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
									onSubmit={this.onSubmit}
								>
									<div className='col-12'>
										<div className='user-login'>
											<div className='email'>
												<span>e-mail:</span>
												<p>{user.email}</p>
											</div>
											<div className='name'>
												<span>name:</span>
												<p>{user.name}</p>
											</div>
										</div>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											id='new_password'
											type='password'
											value={form.new_password}
											onChange={this.onChange}
											label='new password'
											icon='lock'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											error={this.checkPassword()}
											debounceTimeout={1000}
											id='check_password'
											type='password'
											value={form.check_password}
											onChange={this.onChange}
											label='new password again'
											icon='lock'
										/>
									</div>
									<Message
										error={this.checkPassword()}
										message={'senhas não conferem...'}
									/>
									{isLoading ? (
										<Loading isLoading={isLoading} />
									) : (
										<div className='col-12'>
											<button
												disabled={this.checkPasswordForm()}
												className='btn-primary'
												type='submit'
												value='Submit'
											>
												change password
											</button>
										</div>
									)}
									<a
										onClick={() => this.props.history.push('/login')}
										href='#'
										className='link forgot-password'
									>
										back to login
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

export default connect(mapStateToProps)(RecoverPassword)
