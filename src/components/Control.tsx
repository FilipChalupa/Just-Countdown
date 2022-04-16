import * as React from 'react'
import { Link } from 'react-router-dom'
import { useGetParameter } from '../utils/useQuery'
import { ControlPanel } from './ControlPanel'

export const Control: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id) {
		return <ControlPanel id={id} />
	}

	return (
		<ul>
			{[
				{
					path: '/control/?id=1',
					label: 'Room 1',
				},
				{
					path: '/control/?id=2',
					label: 'Room 2',
				},
				{
					path: '/control/?id=3',
					label: 'Room 3',
				},
			].map((item) => (
				<li key={item.path}>
					<Link to={item.path}>{item.label}</Link>
				</li>
			))}
		</ul>
	)
}
