import * as React from 'react'
import { ScaleLoader } from 'react-spinners'

// Functional Component
export const Loading = ({ ...props }) => (
	<div className='system-loading'>
		<ScaleLoader
			height={15}
			width={5}
			radius={0}
			margin='2px'
			color={'#444'}
			loading={props.isLoading}
		/>
	</div>
)
