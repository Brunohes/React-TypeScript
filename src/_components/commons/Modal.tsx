import * as React from 'react'

// Functional Component
export const Modal = ({ ...props }) => (
	<section className={`modal ${props.show ? 'active' : ''}`}>
		<div
			className='modal-bg'
			style={{
				maxWidth: props.modalWidth
			}}
		>
			<div className='modal-container'>{props.children}</div>
		</div>
	</section>
)
