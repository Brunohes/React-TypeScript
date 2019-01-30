import * as React from 'react'

// Models
import IUser from '../../../_models/User'
// Libs
import MaskedInput from 'react-text-mask'
const { DebounceInput } = require('react-debounce-input')
import 'boxicons'
// Services
import { patchUser } from '../../../_services/user.service'
// Helpers
import Helper from '../../../_helpers/Helper'
import { maskCPF, maskTel, moneyMask } from '../../../_helpers/Mask'

// Components
import { Modal } from '../../commons/Modal'
import { Loading } from '../../commons/Loading'
// Assets
// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SaveUserAction } from '../../../_actions'
import IStore from '../../../_models/Store'
import { InputPrimary } from '../../commons/InputPrimary'
const mapStateToProps = store => ({
	isLoading: store.loadingState.isLoading,
	user: store.userState.user
})
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			SaveUserAction
		},
		dispatch
	)

// Interfaces
interface IProps extends IStore {
	SaveUserAction: any
}
interface IState {
	message: string
	form: {
		name: string;
		email: string;
		cpf: string;
		tel: string;
	}
	modal: {
		show: boolean;
		old_password: string;
		new_password: string;
		check_password: string;
	}
}

class Profile extends React.Component<IProps, IState> {
	public state: IState = {
		message: '',
		form: {
			name: '',
			email: '',
			cpf: '',
			tel: ''
		},
		modal: {
			show: false,
			old_password: '',
			new_password: '',
			check_password: ''
		}
	}

	public componentDidMount(): void {
		const { user } = this.props
		this.populateForm(user)
	}

	private async populateForm(user: IUser): Promise<void> {
		this.setState({ form: { ...this.state.form, ...user } })
	}

	private onSubmit = async (event: React.FormEvent): Promise<void> => {
		try {
			event.preventDefault()
			const { form } = this.state
			const { user } = this.props
			const userId = user._id

			const content = await patchUser(userId, form)

			this.props.SaveUserAction(content)
			this.populateForm(content)
		} catch (err) {}
	}

	private onSubmitModal = async (event: React.FormEvent): Promise<void> => {
		try {
			event.preventDefault()
			const { modal } = this.state
			const { user } = this.props
			const userId = user._id

			await patchUser(userId, {
				old_password: modal.old_password,
				new_password: modal.new_password
			})

			this.setState({
				modal: {
					...this.state.modal,
					show: false,
					new_password: '',
					old_password: '',
					check_password: ''
				}
			})
		} catch (err) {}
	}

	private handleModal(): void {
		if (this.state.modal.show === true) {
			this.setState({
				modal: {
					...this.state.modal,
					show: false,
					new_password: '',
					old_password: '',
					check_password: ''
				}
			})

			return
		}
		this.setState({ modal: { ...this.state.modal, show: true } })
	}

	private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			form: { ...this.state.form, [event.target.id]: event.target.value }
		})
	}

	private _checkPassword(): boolean {
		const { new_password, check_password } = this.state.modal

		if (check_password.length != 0) {
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

	private _checkTel(): boolean {
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

	private _checkName(): boolean {
		const { name } = this.state.form

		if (name.trim().length === 0) {
			return true
		}

		return false
	}

	private _checkCPF(): boolean {
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

	private checkEmail(): boolean {
		const { email } = this.state.form

		if (email.length !== 0) {
			const isTrue: boolean = Helper.checkEmail(email)
			if (!isTrue) {
				return true
			}

			return false
		}

		return false
	}

	private _checkPasswordForm(): boolean {
		const { old_password, new_password, check_password } = this.state.modal
		const errors: object = {
			oldPassword: old_password.trim().length === 0,
			checkPassword: !Helper.checkPassword(new_password, check_password)
		}
		const isDisabled: boolean = Object.keys(errors).some(x => errors[x])

		return isDisabled
	}

	private _checkUserForm(): boolean {
		const { name, email, cpf, tel } = this.state.form
		const errors: object = {
			name: name.trim().length === 0,
			email: !Helper.checkEmail(email),
			cpf: !Helper.checkCPF(cpf),
			tel: !Helper.checkTel(tel)
		}
		const isDisabled: boolean = Object.keys(errors).some(x => errors[x])

		return isDisabled
	}

	public render(): JSX.Element {
		const { form, modal } = this.state

		const { isLoading } = this.props

		return (
			<section>
				<div className='row'>
					<div className='col-12 col-md-6 offset-md-3 offset-0'>
						<form noValidate={true} className='row' onSubmit={this.onSubmit}>
							<div className='col-12'>
								<InputPrimary
									maxLength={50}
									debounceTimeout={1000}
									id='name'
									type='text'
									value={form.name}
									onChange={this.onChange}
									icon='user'
									label='name'
								/>
							</div>
							<div className='col-12'>
								<InputPrimary
									disabled={true}
									error={this.checkEmail()}
									message='invalid e-mail'
									maxLength={50}
									debounceTimeout={1000}
									id='email'
									type='text'
									value={form.email}
									onChange={this.onChange}
									icon='envelope'
									label='e-mail'
								/>
							</div>
							<div className='col-12'>
								<InputPrimary
									error={this._checkTel()}
									message='invalid telephone'
									debounceTimeout={1000}
									mask={maskTel(form.tel.length)}
									id='tel'
									type='text'
									value={form.tel}
									onChange={this.onChange}
									icon='phone'
									label='telephone'
								/>
							</div>
							<div className='col-12'>
								<InputPrimary
									error={this._checkCPF()}
									message='invalid cpf'
									mask={maskCPF}
									debounceTimeout={1000}
									id='cpf'
									type='text'
									value={form.cpf}
									onChange={event =>
										this.setState({
											form: { ...this.state.form, cpf: event.target.value }
										})
									}
									icon='credit-card'
									label='cpf'
								/>
							</div>
							{isLoading ? (
								<Loading isLoading={this.props.isLoading} />
							) : (
								<React.Fragment>
									<div className='col-12'>
										<a
											onClick={() => this.handleModal()}
											className='btn-primary'
											type='submit'
										>
											change password
										</a>
									</div>
									<div className='col-12'>
										<button
											disabled={this._checkUserForm()}
											className='btn-primary'
											type='submit'
											value='Submit'
										>
											save
										</button>
									</div>
								</React.Fragment>
							)}
						</form>
					</div>
				</div>

				<Modal show={modal.show}>
					<form onSubmit={this.onSubmitModal}>
						<div className='modal-header'>
							<h3>change password</h3>
							<a
								type='button'
								onClick={() => this.handleModal()}
								className='close'
							>
								<box-icon name='x' />
							</a>
						</div>
						<div className='modal-body'>
							<div className='col-12'>
								<InputPrimary
									autoComplete='new-password'
									id='old_password'
									type='password'
									value={modal.old_password}
									onChange={event =>
										this.setState({
											modal: {
												...this.state.modal,
												old_password: event.target.value
											}
										})
									}
									icon='lock'
									label='old password'
								/>
							</div>

							<div className='col-12'>
								<InputPrimary
									autoComplete='new-password'
									id='new_password'
									type='password'
									value={modal.new_password}
									onChange={event =>
										this.setState({
											modal: {
												...this.state.modal,
												new_password: event.target.value
											}
										})
									}
									icon='lock'
									label='new password'
								/>
							</div>

							<div className='col-12'>
								<InputPrimary
									error={this._checkPassword()}
									debounceTimeout={1000}
									message='password not match'
									id='check_password'
									type='password'
									value={modal.check_password}
									onChange={event =>
										this.setState({
											modal: {
												...this.state.modal,
												check_password: event.target.value,
												shouldVerify: true
											}
										})
									}
									icon='lock'
									label='confirm password'
								/>
							</div>
						</div>
						{isLoading ? (
							<Loading />
						) : (
							<div className='modal-footer'>
								<div className='col-12 col-md-6'>
									<a
										onClick={() => this.handleModal()}
										className='btn-primary cancel'
									>
										Cancelar
									</a>
								</div>
								<div className='col-12 col-md-6'>
									<button
										disabled={this._checkPasswordForm()}
										className='btn-primary'
										type='submit'
									>
										save
									</button>
								</div>
							</div>
						)}
					</form>
				</Modal>
			</section>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)
