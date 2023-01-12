import * as React from 'react'
import { ControlledScreen } from '../../../ControlledScreen'
import { FullScreenLoading } from '../../../FullScreenLoading'
import { useChromecastReceiverId } from '../useChromecastReceiverId'

export const Cast: React.FunctionComponent = () => {
	const id = useChromecastReceiverId()

	if (id === null) {
		return <FullScreenLoading />
	}

	return <ControlledScreen id={id} />
}
