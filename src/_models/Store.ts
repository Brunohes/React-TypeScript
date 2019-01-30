import IUser from './User'

export default interface IStore {
	isLoading?: boolean
	user?: IUser
	access_token?: string
	refresh_token?: string

	// TODO: Pensar em Tipo
	history?: any
	location?: any
	match?: any
}
