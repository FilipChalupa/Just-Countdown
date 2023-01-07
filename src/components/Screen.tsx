import * as React from 'react'
import { useGetParameter } from '../utilities/useQuery'
import { ControlledScreen } from './ControlledScreen'

export const Screen: React.FunctionComponent = () => {
	const id = useGetParameter('id')!

	return <ControlledScreen id={id} />
}
