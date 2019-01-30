import { Reducer, Store, createStore } from 'redux'
import { Reducers } from '../_reducers'

import {
	PersistConfig,
	Persistor,
	persistReducer,
	persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig: PersistConfig = {
	key: 'root',
	storage
}

const persistedReducer: Reducer = persistReducer(persistConfig, Reducers)

export const store: Store = createStore(persistedReducer)
export const persistor: Persistor = persistStore(store)

// export const store = createStore(Reducers)
