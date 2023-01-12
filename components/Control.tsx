import * as React from 'react'
import { useGetParameter } from '../utilities/useGetParameter'
import { ControlPanel } from './ControlPanel'
import { Redirect } from './Redirect'

export const Control: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	if (id === null) {
		return <Redirect to="/" />
	}

	return <ControlPanel id={id} />
}
