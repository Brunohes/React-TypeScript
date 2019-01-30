import * as React from 'react'

// Models
import IStore from '../../../_models/Store'

// Libs
import 'boxicons'

// Services
import { requestChangePassword } from '../../../_services/auth.service'

// Helpers

// Components
import { Loading } from '../../commons/Loading'
import ParticlePrimary from '../../commons/ParticlePrimary'
import { InputPrimary } from '../../commons/InputPrimary'

/// Assets

// Redux
import { connect } from 'react-redux'
const mapStateToProps = store => ({
	isLoading: store.loadingState.isLoading
})

// Interfaces
interface IProps extends IStore {}
interface IState {
	email: string
}

class Forgot extends React.Component<IProps, IState> {
	public state: IState = {
		email: ''
	}

	private _onSubmit = async (event: React.FormEvent): Promise<void> => {
		try {
			event.preventDefault()

			const { email } = this.state

			await requestChangePassword({ email })

			this.props.history.push('/login')
		} catch (err) {}
	}

	private _onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ [event.target.id]: event.target.value } as Pick<
			IState,
			keyof IState
		>)
	}

	public render(): JSX.Element {
		const { isLoading } = this.props

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
										<img className='logo' />
									</div>
									<div className='col-12'>
										<InputPrimary
											debounceTimeout={1000}
											autoComplete='new-password'
											id='email'
											type='text'
											value={this.state.email}
											onChange={this._onChange}
											label='e-mail'
											icon='at'
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
												request change
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

export default connect(mapStateToProps)(Forgot)
