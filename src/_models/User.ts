export default interface IUser {
	[x: string]: any
	_id?: string
	name?: string
	email?: string
	password?: string
	user_type?: string
	reset_token?: string
	created_date?: string
	tel?: string
	cpf?: string
	tags?: Array<ITags>
	media_surl?: string
	status?: string
}

export interface ITags {
	value?: string
	label?: string
	color?: string
}
