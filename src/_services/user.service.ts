import axiosInstance from './axiosInstance'

// Handler
import { HandleError } from '../_helpers/HandleError'

// Libs
import { toastr } from 'react-redux-toastr'

// Models
import IUser, { ITags } from '../_models/User'
import { AxiosResponse } from 'axios'

export const newUser: any = async (payload: any): Promise<void> => {
	try {
		const response: AxiosResponse = await axiosInstance.post('/user', payload)
		toastr.success('success!', response.data.message || 'success!')
	} catch (err) {
		HandleError(err)
	}
}

export const completeRegistration: any = async (
	userId: string,
	payload: object
): Promise<any> => {
	try {
		const response: AxiosResponse = await axiosInstance.patch(
			`/user/complete-registration/${userId}`,
			payload
		)
		// toastr.success('success!', response.data.message || 'success!')

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const patchUser: any = async (
	userId: string,
	payload: object
): Promise<any> => {
	try {
		const response: AxiosResponse = await axiosInstance.patch(
			`/user/${userId}`,
			payload
		)
		toastr.success('success!', response.data.message || 'success!')

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const editCollab: any = async (
	userId: string,
	payload: any
): Promise<any> => {
	try {
		const response: AxiosResponse = await axiosInstance.patch(
			`/user/${userId}`,
			payload
		)
		toastr.success('success!', response.data.message || 'success!')

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const getUsers: any = async (): Promise<IUser> => {
	try {
		const response: AxiosResponse = await axiosInstance.get('/user/')

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const getUserDetails: any = async (userId: string): Promise<IUser> => {
	try {
		const response: AxiosResponse = await axiosInstance.get(`/user/${userId}`)

		return response.data.content
	} catch (error) {
		HandleError(error)
	}
}

export const deleteUser: any = async (userId: string): Promise<void> => {
	try {
		const response: AxiosResponse = await axiosInstance.delete(
			`/user/${userId}`
		)
		toastr.success('success!', response.data.message || 'success!')
	} catch (error) {
		HandleError(error)
	}
}

export const resendEmail: any = async (payload: object): Promise<void> => {
	try {
		const response: AxiosResponse = await axiosInstance.post(
			'/user/resend-email',
			payload
		)
		toastr.success('success!', response.data.message || 'success!')
	} catch (error) {
		HandleError(error)
	}
}
