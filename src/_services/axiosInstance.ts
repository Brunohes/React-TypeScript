import axios, { AxiosInstance } from 'axios'
import { toastr } from 'react-redux-toastr'
import { store } from '../_store'
import { LoadAction, SaveAccessAction, SaveRefreshAction } from '../_actions'
import { getNewAccess } from '../_services/auth.service'
// import { HandleError } from '../_helpers/HandleError'

console.log(process.env.API_URL)

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.API_URL,
	timeout: 8000,
	headers: {
		'Content-Type': 'application/json',
		"Authorization": 'Bearer'
	}
})

axiosInstance.interceptors.request.use(
	request => {
		request.headers.Authorization = `Bearer ${
			store.getState().userState.access_token
		}`
		store.dispatch(LoadAction(true))

		return request
	},
	err => {
		store.dispatch(LoadAction(false))
		toastr.error('Ops!', 'server unavailable...')

		return Promise.reject(err)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		store.dispatch(LoadAction(false))

		return response
	},
	err => {
		if (err.request && err.request.status === 401) {
			const refresh_token: any = store.getState().userState.refresh_token
			_refreshToken(refresh_token)
			store.dispatch(LoadAction(false))
			throw new Error('')
		}
		throw err
	}
)

const _refreshToken: any = async (refresh_token: string): Promise<void> => {
	try {
		if (refresh_token !== null && refresh_token !== undefined) {
			// console.log('CASE 01')
			const content: any = await getNewAccess({
				refresh_token
			})
			store.dispatch(SaveAccessAction(content))
			store.dispatch(LoadAction(false))
			window.location.reload()

			throw new Error('')
		}
		// console.log('CASE 02')
		store.dispatch(LoadAction(false))
		window.location.href = '/login'
		toastr.error('Erro!', 'invalid token...')
	} catch (error) {
		store.dispatch(SaveRefreshAction(undefined))
		throw new Error('')
	}
}

export default axiosInstance
