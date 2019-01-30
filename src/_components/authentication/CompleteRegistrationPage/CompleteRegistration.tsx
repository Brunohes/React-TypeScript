import * as React from 'react'
import { match } from 'react-router-dom'

// Models
import IUser from '../../../_models/User'

// Libs
import MaskedInput from 'react-text-mask'
const { DebounceInput } = require('react-debounce-input')
import { toastr } from 'react-redux-toastr'
import 'boxicons'

// Services
import {
	completeRegistration,
	getUserDetails
} from '../../../_services/user.service'

// Helpers
import { maskCPF, maskTel, moneyMask } from '../../../_helpers/Mask'
import Helper from '../../../_helpers/Helper'

// Components
import { Loading } from '../../commons/Loading'
import ParticlePrimary from '../../commons/ParticlePrimary'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	SaveAccessAction,
	SaveRefreshAction,
	SaveUserAction
} from '../../../_actions'
import IStore from '../../../_models/Store'
import { InputPrimary } from '../../commons/InputPrimary'

const mapDispatchToProps: any = dispatch =>
	bindActionCreators(
		{
			SaveUserAction,
			SaveAccessAction,
			SaveRefreshAction
		},
		dispatch
	)

const mapStateToProps: any = store => ({
	isLoading: store.loadingState.isLoading,
	user: store.userState.user,
	access_token: store.userState.access_token,
	refresh_token: store.userState.refresh_token
})

// Interfaces
interface IProps extends IStore {
	userId: string

	// Create a interface ??
	SaveUserAction: any
	SaveAccessAction: any
	SaveRefreshAction: any
}
interface IState {
	user: IUser
	form: {
		new_password: string;
		check_password: string;
		cpf: string;
		tel: string;
	}
	userId: string
}

class CompleteRegistration extends React.Component<IProps, IState> {
	public state: IState = {
		user: {
			name: '',
			email: ''
		},
		form: {
			new_password: '',
			check_password: '',
			cpf: '',
			tel: ''
		},
		userId: this.props.match.params.userId
	}

	public async componentDidMount(): Promise<void> {
		try {
			const { userId } = this.state

			const content: IUser = await getUserDetails(userId)

			if (content.status !== 'PENDING') {
				throw { message: 'user has already completed the registration...' }
			}

			this.setState({
				user: { ...this.state.user, ...content },
				form: { ...this.state.form, cpf: content.cpf, tel: content.tel }
			})
		} catch (error) {
			toastr.error('Ops!', error.message || 'somenthing went wrong...')
			this.props.history.push('/login') // Redirects if user not found...
		}
	}

	private onSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault()

		const { form, userId } = this.state

		// TODO: Create a interface for response
		const content: any = await completeRegistration(userId, {
			password: form.check_password,
			tel: form.tel,
			cpf: form.cpf
		})

		this.props.SaveUserAction(content.user)
		this.props.SaveAccessAction(content.access_token)
		this.props.SaveRefreshAction(content.refresh_token)
		this.props.history.push('/panel/tracker')
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

	private checkCPF(): boolean {
		const { cpf } = this.state.form
		const isTrue: boolean = Helper.checkCPF(cpf)

		if (cpf.length !== 0) {
			if (!isTrue) {
				return true
			}

			return false
		}

		return false
	}

	private checkTel(): boolean {
		const { tel } = this.state.form
		const isTrue: boolean = Helper.checkTel(tel)

		if (tel.length !== 0) {
			if (!isTrue) {
				return true
			}

			return false
		}

		return false
	}

	private checkCompleteForm(): boolean {
		const { new_password, check_password, cpf, tel } = this.state.form
		const errors: any = {
			newPassword: new_password.trim().length === 0,
			checkPassword: !Helper.checkPassword(new_password, check_password),
			cpf: !Helper.checkCPF(cpf),
			tel: !Helper.checkTel(tel)
		}
		const isDisabled: boolean = Object.keys(errors).some(x => errors[x])

		return isDisabled
	}

	public render(): JSX.Element {
		const { user, form } = this.state

		const { isLoading } = this.props

		return (
			<>
				<ParticlePrimary />
				<section className='container-fluid login-component overflow-auto'>
					<div className='row'>
						<div className='col-12'>
							<section className='complete'>
								<form
									style={{
										zIndex: 2
									}}
									className='row'
									onSubmit={this.onSubmit}
								>
									<div className='col-12'>
										<h3 className='title'>complete registration</h3>
									</div>
									<div className='col-12'>
										<InputPrimary
											disabled={true}
											id='name'
											type='text'
											value={user.name}
											onChange={this.onChange}
											label='name'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											disabled={true}
											id='email'
											type='text'
											value={user.email}
											onChange={this.onChange}
											label='e-mail'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											id='new_password'
											type='password'
											value={form.new_password}
											onChange={this.onChange}
											icon='lock'
											label='password'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											message='password not match'
											error={this.checkPassword()}
											id='check_password'
											type='password'
											value={form.check_password}
											onChange={this.onChange}
											icon='lock'
											label='confirm password'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											mask={maskCPF()}
											id='cpf'
											type='text'
											message='invalid cpf'
											error={this.checkCPF()}
											value={form.cpf}
											onChange={this.onChange}
											icon='credit-card'
											label='cpf'
										/>
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											mask={maskTel(form.tel.length)}
											error={this.checkTel()}
											message='invalid telephone'
											id='tel'
											type='text'
											value={form.tel}
											onChange={this.onChange}
											icon='phone'
											label='telephone'
										/>
									</div>
									{isLoading ? (
										<Loading isLoading={isLoading} />
									) : (
										<div className='col-12'>
											<button
												disabled={this.checkCompleteForm()}
												className='btn-primary'
												type='submit'
												value='Submit'
											>
												send
											</button>
										</div>
									)}
								</form>
							</section>
						</div>
					</div>
				</section>
			</>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompleteRegistration)
