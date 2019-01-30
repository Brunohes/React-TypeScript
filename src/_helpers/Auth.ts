import { store } from '../_store'

export const isAuthenticated: any = async () => {
	const access_token: any = store.getState().userState.access_token
	const refresh_token: any = store.getState().userState.refresh_token
	const user: any = store.getState().userState.user
	if (!access_token || access_token.length === 0) return false
	if (!refresh_token) return false
	if (!user) return false

	return true
}
