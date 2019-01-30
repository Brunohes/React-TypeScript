import {
	LOADING,
	LOCATION,
	SAVE_ACCESS,
	SAVE_REFRESH,
	SAVE_USER
} from './actionTypes'

export const LoadAction: any = value => ({
	type: LOADING,
	isLoading: value
})

export const SaveLocation: any = value => ({
	type: LOCATION,
	location: value
})

export const SaveUserAction: any = value => ({
	type: SAVE_USER,
	user: value
})

export const SaveAccessAction: any = value => ({
	type: SAVE_ACCESS,
	access_token: value
})

export const SaveRefreshAction: any = value => ({
	type: SAVE_REFRESH,
	refresh_token: value
})
