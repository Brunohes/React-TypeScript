import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import MaskedInput from 'react-text-mask'
import { Message } from './Message'
// const DebounceInput = require('react-debounce-input')
// const MaskedInput = require('react-text-mask')

// Functional Component
export const InputPrimary = ({ ...props }: IInputPrimary) => {
	const checkMessage = () => {
		if (props.message && props.value.trim().length !== 0 && props.error) {
			return <Message error={true} message={props.message} />
		}

		return ''
	}

	if (props.mask) {
		const Mask: React.ComponentType = ({ ...pro }) => <MaskedInput {...pro} />

		return (
			<>
				<div
					key={props.id}
					className={`input-primary ${
						props.error && props.value.trim().length !== 0 ? 'error' : ''
					}`}
				>
					<DebounceInput
						guide={props.guide || false}
						showMask={false}
						disabled={props.disabled}
						debounceTimeout={props.debounceTimeout}
						required
						onChange={props.onChange}
						autoComplete={props.autoComplete}
						id={props.id}
						type={props.type}
						value={props.value}
						mask={props.mask}
						element={Mask}
						maxLength={props.maxLength}
					/>
					<box-icon name={props.icon} type={props.iconType} />
					<label htmlFor={props.id}>{props.label}</label>
				</div>
				{checkMessage()}
			</>
		)
	}

	return (
		<>
			<div
				key={props.id}
				className={`input-primary ${
					props.error && props.value.trim().length !== 0 ? 'error' : ''
				}`}
			>
				<DebounceInput
					disabled={props.disabled}
					debounceTimeout={props.debounceTimeout}
					required
					onChange={props.onChange}
					autoComplete={props.autoComplete}
					id={props.id}
					type={props.type}
					value={props.value}
					maxLength={props.maxLength}
				/>
				<box-icon name={props.icon} type={props.iconType} />
				<label htmlFor={props.id}>{props.label}</label>
			</div>
			{checkMessage()}
		</>
	)
}

interface IInputPrimary {
	message?: string
	maxLength?: number
	disabled?: boolean
	error?: boolean
	debounceTimeout?: number
	onChange?: (event: any) => void
	autoComplete?: string
	id?: string
	type?: string
	value?: string
	icon?: string
	iconType?: string
	label?: string
	mask?: Array<any> | any
	guide?: boolean
}
