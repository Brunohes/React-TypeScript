import { toastr } from 'react-redux-toastr'
import { store } from '../_store'
import { LoadAction, SaveAccessAction, SaveRefreshAction } from '../_actions'
// import { getNewAccess } from '../_services/auth.service'

export const HandleError: any = err => {
	if (err.response && err.response.status === 420) {
		toastr.warning('Ops!', err.response.data.error.message)
		store.dispatch(LoadAction(false))
		throw new Error('')
	}
	if (err.response && err.response.status === 500) {
		toastr.error('Ops!', 'server unavailable...')
		store.dispatch(LoadAction(false))
		throw new Error('')
	}
	if (err.response && err.response.status === 404) {
		toastr.warning('Ops!', 'server unavailable...')
		store.dispatch(LoadAction(false))
		throw new Error('')
	}
	if (err.request) {
		toastr.warning('Ops!', 'server unavailable...')
		store.dispatch(LoadAction(false))
		throw new Error('')
	}

	// toastr.error('Ops!', 'Servidor indisponível...')
	// store.dispatch(LoadAction(false))
	// throw ''
}
