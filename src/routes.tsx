import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import { isAuthenticated } from './_helpers/Auth'

import Login from './_components/authentication/LoginPage/Login'
import Forgot from './_components/authentication/ForgotPage/Forgot'
import Panel from './_components/commons/Panel'
import CompleteRegistration from './_components/authentication/CompleteRegistrationPage/CompleteRegistration'
import RecoverPassword from './_components/authentication/RecoverPasswordPage/RecoverPassword'

const PrivateRoute: any = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: '/login', state: { from: props.location } }}
				/>
			)
		}
	/>
)

const Routes: () => JSX.Element = () => (
	<HashRouter basename={'/'}>
		<Switch>
			<Route exact path='/login' component={Login} />
			<Route exact path='/forgot-password' component={Forgot} />
			<Route
				path='/complete-registration/:userId'
				component={CompleteRegistration}
			/>
			<Route path='/recover-password/' component={RecoverPassword} />
			<PrivateRoute path='/panel' component={Panel} />
			<Redirect from='*' to={{ pathname: '/login' }} />
		</Switch>
	</HashRouter>
)

export default Routes
