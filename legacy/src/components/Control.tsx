import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useGetParameter } from '../../../utilities/useQuery'
import { ControlPanel } from './ControlPanel'

export const Control: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id === null) {
		return <Redirect to="/" />
	}

	return <ControlPanel id={id} />
}
