import axiosInstance from './axiosInstance'
import IUser from '../_models/User'
import { toastr } from 'react-redux-toastr'

// Redux
import {
	SaveAccessAction,
	SaveRefreshAction,
	SaveUserAction
} from '../_actions'
import { store } from '../_store'

// Handler
import { HandleError } from '../_helpers/HandleError'
import { AxiosResponse } from 'axios'

export const login: any = async (
	email: string,
	password: string
): Promise<void> => {
	try {
		const response: AxiosResponse = await axiosInstance.post('/auth/login', {
			email,
			password
		})

		store.dispatch(SaveUserAction(response.data.content.user))
		store.dispatch(SaveAccessAction(response.data.content.access_token))
		store.dispatch(SaveRefreshAction(response.data.content.refresh_token))

		return
	} catch (error) {
		HandleError(error)
	}
}

export const getNewAccess: any = async (
	refresh_token: object
): Promise<any> => {
	try {
		const response: AxiosResponse = await axiosInstance.post(
			'/auth/refresh',
			refresh_token
		)

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const logout: any = async (props: any): Promise<void> => {
	store.dispatch(SaveUserAction(''))
	store.dispatch(SaveAccessAction(''))
	store.dispatch(SaveRefreshAction(''))
	props.history.push('/login')
}

export const getUserByResetToken: any = async (
	token: string
): Promise<IUser> => {
	try {
		const response: AxiosResponse = await axiosInstance.get(
			`/auth/user-by-reset-token/${token}`
		)

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const requestChangePassword: any = async (
	email: object
): Promise<void> => {
	try {
		const response: AxiosResponse = await axiosInstance.post(
			'/auth/request-change-password',
			email
		)
		toastr.success('success!', response.data.message || 'Sucesso!')
	} catch (error) {
		HandleError(error)
	}
}

export const changePassword: any = async (payload: object): Promise<any> => {
	try {
		const response: AxiosResponse = await axiosInstance.patch(
			'/auth/change-password',
			payload
		)
		toastr.success('success!', response.data.message || 'Sucesso!')

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}
