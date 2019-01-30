import { SAVE_ACCESS, SAVE_REFRESH, SAVE_USER } from '../_actions/actionTypes'

const initialState: any = {
	user: {},
	access_token: '',
	refresh_token: ''
}

export const userReducer: any = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_USER:
			return {
				...state,
				user: action.user
			}
		case SAVE_ACCESS:
			return {
				...state,
				access_token: action.access_token
			}
		case SAVE_REFRESH:
			return {
				...state,
				refresh_token: action.refresh_token
			}
		default:
			return state
	}
}
