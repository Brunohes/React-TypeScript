import * as React from 'react'

// Components
import { Loading } from './Loading'

// Functional Component
const TableLoading = ({ props }) => (
	<div>
		{props.isLoading ? (
			<div className='table-loading'>
				<Loading isLoading={props.isLoading} />
			</div>
		) : (
			''
		)}
	</div>
)

export default TableLoading
