import { LOADING } from '../_actions/actionTypes'

const initialState: any = {
	isLoading: false
}

export const loadingReducer: any = (state = initialState, action) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				isLoading: action.isLoading
			}
		default:
			return state
	}
}
