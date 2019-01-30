import * as React from 'react'
export const CheckSlider = ({ ...props }) => (
	<div className='input-checkbox'>
		<input
			id={props.id}
			checked={props.checked}
			type='checkbox'
			onChange={props.onChange}
		/>

		<label className='slider' htmlFor={props.id} />

		<span className='label'>{props.label}</span>
	</div>
)
