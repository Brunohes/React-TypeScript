import * as React from 'react'

// Models

// Libs
import { Route, NavLink } from 'react-router-dom'
import 'boxicons'

// Services
import { logout } from '../../_services/auth.service'

// Helpers

// Components
import Profile from '../people/ProfilePage/Profile'

// Assets

// Redux
import { connect } from 'react-redux'
import IStore from '../../_models/Store'
import Routes from '../../routes'
import { userInfo } from 'os'
const mapStateToProps = store => ({
	user: store.userState.user
})

// Interfaces
interface IProps extends IStore {}
interface IState {
	nav: {
		isOpen: boolean;
	}
}

class Panel extends React.Component<IProps, IState> {
	public state: IState = {
		nav: {
			isOpen: true
		}
	}

	public componentDidMount(): void {
		// if (!this.props.user) {
		// 	this.props.history.push('/login')
		// 	return
		// }
	}

	private handleNav(): void {
		if (this.state.nav.isOpen === true) {
			this.setState({ nav: { isOpen: false } })

			return
		}

		this.setState({ nav: { isOpen: true } })
	}

	private handleNavClass(): string {
		if (this.state.nav.isOpen === true) return 'active'

		return ''
	}

	private routes = () => {
		// Shared Routes
		const routes: any = [
			// Array of Shared Routes
			/*
				{
					name: '',
					path: '',
					component: '',
					icon: ''
				}
			*/
		]

		// Only Admin Routes
		if (this.props.user.user_type === 'ADMIN') {
			routes
				.push
				// Array of Admin Routes
				()
		}

		return routes
	}

	public render(): JSX.Element {
		const { user } = this.props
		const routes: any = this.routes()

		return (
			<section className='inside-panel'>
				<nav className={this.handleNavClass()}>
					<ul>
						<li>
							<NavLink
								className='profile-img'
								activeClassName='active'
								to='/panel/profile'
							>
								<div className='image'>
									<img />
								</div>
								<span className='nav-text user-name'>
									{/* Hi, {user.name.split(' ')[0]} */}
								</span>
							</NavLink>
						</li>
					</ul>
					<ul>
						{routes.map(route => (
							<li key={route.name}>
								<NavLink
									className='nav-link'
									activeClassName='active'
									to={route.path}
								>
									<div className='nav-icon'>
										<box-icon name={route.icon} />
									</div>
									<span className='nav-text'>{route.name}</span>
								</NavLink>
							</li>
						))}
					</ul>
					<ul>
						<li className='logout'>
							<NavLink
								className='nav-link'
								activeClassName='active'
								to='/login'
								onClick={() => logout(this.props)}
							>
								<div className='nav-icon'>
									<box-icon name='log-out' />
								</div>
								<span className='nav-text'>Sair</span>
							</NavLink>
						</li>
					</ul>
					<div className='open-nav' onClick={() => this.handleNav()}>
						<box-icon name='chevron-right' />
					</div>
				</nav>
				<main className='container-fluid'>
					<div className='row'>
						<div className='col-12'>
							{routes.map(route => (
								<Route
									key={route.name}
									exact
									path={route.path}
									component={route.component}
								/>
							))}

							<Route exact path='/panel/profile' component={Profile} />
						</div>
					</div>
				</main>
			</section>
		)
	}
}

export default connect(mapStateToProps)(Panel)
