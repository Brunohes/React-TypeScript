import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export const maskCPF = (): Array<any> => [
	/[0-9]/,
	/[0-9]/,
	/[0-9]/,
	'.',
	/[0-9]/,
	/[0-9]/,
	/[0-9]/,
	'.',
	/[0-9]/,
	/[0-9]/,
	/[0-9]/,
	'-',
	/[0-9]/,
	/[0-9]/
]

// FIXME:
export const maskTel = (length: number): Array<any> => {
	if (length >= 15) {
		return [
			'(',
			/[0-9]/,
			/[0-9]/,
			')',
			' ',
			/[0-9]/,
			/[0-9]/,
			/[0-9]/,
			/[0-9]/,
			/[0-9]/,
			'.',
			/[0-9]/,
			/[0-9]/,
			/[0-9]/,
			/[0-9]/
		]
	}

	return [
		'(',
		/[0-9]/,
		/[0-9]/,
		')',
		' ',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		'.',
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]/,
		/[0-9]?/
	]
}

export const moneyMask = createNumberMask({
	prefix: 'R$ ',
	includeThousandsSeparator: true,
	thousandsSeparatorSymbol: '.',
	allowDecimal: true,
	decimalSymbol: ',',
	decimalLimit: 2
})
