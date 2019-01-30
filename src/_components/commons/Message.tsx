import * as React from 'react'

// Functional Component
export const Message = ({ ...props }) => (
	<>
		{props.error ? (
			<div className={'system-message error'}>
				<p>{props.message}</p>
			</div>
		) : (
			''
		)}
	</>
)
