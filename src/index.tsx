import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Routes from './routes'

import 'react-table/react-table.css'
import './scss/main.scss'

import ErrorBoundary from './_components/commons/ErrorBoundary'

import { Provider } from 'react-redux'
import { persistor, store } from './_store'
import { PersistGate } from 'redux-persist/integration/react'
import ReduxToastr from 'react-redux-toastr'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<React.Fragment>
				<ErrorBoundary>
					<Routes />
					<ReduxToastr
						timeOut={5000}
						newestOnTop={true}
						preventDuplicates
						position='top-right'
						transitionIn='bounceIn'
						transitionOut='fadeOut'
					/>
				</ErrorBoundary>
			</React.Fragment>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)
