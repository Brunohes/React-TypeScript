import { Reducer, combineReducers } from 'redux'

import { reducer as toastrReducer } from 'react-redux-toastr'
import { loadingReducer } from './loadingReducer'
import { userReducer } from './userReducer'
import { locationReducer } from './locationReducer'

const reducers: any = {
	loadingState: loadingReducer,
	locationState: locationReducer,
	userState: userReducer,
	toastr: toastrReducer
}

export const Reducers: Reducer = combineReducers(reducers)
