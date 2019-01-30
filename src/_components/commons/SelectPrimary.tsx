import * as React from 'react'
import Select from 'react-select'
import { StylesConfig } from 'react-select/lib/styles'
import { defaultProps } from 'react-select/lib/Creatable'
import * as chroma from 'chroma-js'

const customStyles: StylesConfig = {
	option: (styles, state) => {
		const color = state.data.color ? chroma(state.data.color) : null

		return {
			"color": state.isSelected
				? color
					? state.data.color
					: '#86e23f'
				: color
				? state.data.color
				: '#272727',
			"background": state.isSelected
				? color
					? color.alpha(0.5).css()
					: '#272727'
				: 'white',
			"padding": 15,
			"cursor": 'pointer',
			"transition": 'all 0.3s',
			"zIndex": 99,

			':hover': {
				background: color ? color.alpha(0.1).css() : '#86e23f',
				color: color ? state.data.color : '#272727'
			}
		}
	},
	control: (styles, state) => ({
		transition: 'all 0.3s',
		width: '100%',
		background: 'white',
		borderRadius: 3,
		border: state.hasValue
			? 'solid 2px #272727'
			: 'solid 2px rgba(128, 128, 128, 0.4)',
		display: 'flex',
		padding: '8px 0',
		cursor: 'pointer',
		zIndex: 99
	}),
	singleValue: (styles, state) => ({
		opacity: state.isDisabled ? 0.2 : 0.8,
		transition: 'all 0.3s'
	}),
	placeholder: (styles, state) => ({
		opacity: state.isDisabled ? 0.2 : 0.4,
		transition: 'all 0.3s'
	}),
	noOptionsMessage: (styles, state) => ({
		padding: 15,
		opacity: state.isDisabled ? 0.2 : 0.4,
		transition: 'all 0.3s'
	}),
	multiValue: (styles, state) => {
		const color = state.data.color ? chroma(state.data.color) : null

		return {
			...styles,
			background: color ? state.data.color : '#272727'
		}
	},
	multiValueLabel: (styles, state) => {
		const color = state.data.color ? chroma(state.data.color) : null

		return {
			...styles,
			color: 'white',
			fontWeight: 'bold',
			fontFamily: 'A',
			fontSize: 12
		}
	},
	multiValueRemove: (styles, state) => {
		const color = state.data.color ? chroma(state.data.color) : null

		return {
			...styles,
			"color": 'white',
			"transition": 'all .3s',
			':hover': {
				backgroundColor: color ? state.data.color : '#272727',
				color: 'white'
			}
		}
	}
}

export const SelectPrimary = ({ ...props }: ISelectPrimary) => (
	<div
		className='input-select'
		style={{
			width: '100%'
		}}
	>
		<Select
			closeMenuOnSelect={props.closeMenuOnSelect}
			isMulti={props.isMulti}
			options={props.options}
			styles={customStyles}
			onChange={props.onChange}
			value={props.value}
			placeholder={props.placeholder}
			noOptionsMessage={() => props.noOptionPlaceholder || 'no options...'}
		/>
	</div>
)

interface ISelectPrimary {
	closeMenuOnSelect?: boolean
	isMulti?: boolean
	options?: any
	styles?: any
	onChange?: (event: any) => void
	value?: any
	placeholder?: string
	noOptionPlaceholder?: string
}
