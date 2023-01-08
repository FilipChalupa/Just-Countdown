import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useGetParameter } from '../utilities/useQuery'
import { ControlledScreen } from './ControlledScreen'

export const Screen: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id === null) {
		return <Redirect to="/"/>
	}

	return <ControlledScreen id={id} />
}
