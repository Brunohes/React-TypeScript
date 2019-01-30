import { LOCATION } from '../_actions/actionTypes'

const initialState: any = {
	location: ''
}

export const locationReducer: any = (state = initialState, action) => {
	switch (action.type) {
		case LOCATION:
			return {
				...state,
				location: action.location
			}
		default:
			return state
	}
}
