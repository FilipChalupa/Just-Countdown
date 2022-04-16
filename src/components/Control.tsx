import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useGetParameter } from '../utils/useQuery'
import { ControlPanel } from './ControlPanel'

export const Control: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id) {
		return <ControlPanel id={id} />
	}

	return <Redirect to="/" />
}
