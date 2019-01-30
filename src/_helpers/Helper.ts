import * as moment from 'moment'
export default class Helper {
	public static checkPassword(
		password: string,
		password_check: string
	): boolean {
		password = password.trim()
		password_check = password_check.trim()

		if (
			password === password_check &&
			password.length !== 0 &&
			password_check.length !== 0
		) {
			return true
		}

		return false
	}

	public static checkCPF(cpf: string): boolean {
		cpf = cpf.replace(/[^\w\s]/gi, '').trim()

		if (
			cpf.length !== 11 ||
			cpf === '00000000000' ||
			cpf === '11111111111' ||
			cpf === '22222222222' ||
			cpf === '33333333333' ||
			cpf === '44444444444' ||
			cpf === '55555555555' ||
			cpf === '66666666666' ||
			cpf === '77777777777' ||
			cpf === '88888888888' ||
			cpf === '99999999999'
		) {
			return false
		}

		// Valida 1o digito
		let add: number = 0
		for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i), 0) * (10 - i)
		let rev: number = 11 - (add % 11)
		if (rev === 10 || rev === 11) rev = 0
		if (rev !== parseInt(cpf.charAt(9), 0)) return false

		// Valida 2o digito
		add = 0
		for (let i: number = 0; i < 10; i++) {
			add += parseInt(cpf.charAt(i), 0) * (11 - i)
		}
		rev = 11 - (add % 11)
		if (rev === 10 || rev === 11) rev = 0
		if (rev !== parseInt(cpf.charAt(10), 0)) return false

		return true
	}

	public static checkEmail(email: string): boolean {
		const regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (email && email.trim().length !== 0) {
			if (regex.test(email.trim())) {
				return true
			}

			return false
		}

		return false
	}

	public static checkTel(tel: string): boolean {
		tel = tel.replace(/\D/g, '').trim()

		// Verifica se tem a quantidade de numero correto
		if (!(tel.length >= 10 && tel.length <= 11)) return false

		if (tel.length === 11 && parseInt(tel.substring(2, 3), 0) !== 9) {
			// Se celular verifica se começa com 9
			return false
		}

		for (let n: any = 0; n < 10; n++) {
			if (tel === new Array(11).join(n) || tel === new Array(12).join(n)) {
				return false
			}
		}

		const codigosDDD: Array<number> = [
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			21,
			22,
			24,
			27,
			28,
			31,
			32,
			33,
			34,
			35,
			37,
			38,
			41,
			42,
			43,
			44,
			45,
			46,
			47,
			48,
			49,
			51,
			53,
			54,
			55,
			61,
			62,
			64,
			63,
			65,
			66,
			67,
			68,
			69,
			71,
			73,
			74,
			75,
			77,
			79,
			81,
			82,
			83,
			84,
			85,
			86,
			87,
			88,
			89,
			91,
			92,
			93,
			94,
			95,
			96,
			97,
			98,
			99
		]

		// verifica se o DDD é valido...
		if (codigosDDD.indexOf(parseInt(tel.substring(0, 2), 0)) === -1) {
			return false
		}

		return true
	}

	public static checkString(value: string): boolean {
		if (value && value.trim().length !== 0) {
			return true
		}

		return false
	}

	public static checkDate(date: string): boolean {
		if (!date && date.trim().length === 0) return false

		const x: moment.Moment = moment(invertDate(date))
		if (x.isValid()) return true

		return false
	}
}

export const invertDate = (dateString: string) => {
	const x: Array<string> = dateString.split('/')

	return `${x[2]}-${x[1]}-${x[0]}`
}

export const formatDate = (dateString: string) => {
	const x: Array<string> = dateString.split('/')
	const z: Array<string> = x[2].split(' ')

	return `${z[0]}-${x[1]}-${x[0]} ${z[1]}`
}

export const moneyToNumber = (value: string): number => {
	const x: string = value.split('R$ ')[1]
	const y: Array<string> = x.split(',')
	const z: string = y[0].replace('.', '')

	return parseFloat(`${z}.${y[1]}`)
}

export const moneyToString = (value: number): string => {
	const x: Array<string> = value.toString().split('.')

	return `R$ ${x[0]}${x[1] ? `,${x[1]}` : ''}`
}
