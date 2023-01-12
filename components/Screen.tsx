import * as React from 'react'
import { useGetParameter } from '../utilities/useGetParameter'
import { ControlledScreen } from './ControlledScreen'
import { Redirect } from './Redirect'

export const Screen: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id === null) {
		return <Redirect to="/" />
	}

	return <ControlledScreen id={id} />
}
