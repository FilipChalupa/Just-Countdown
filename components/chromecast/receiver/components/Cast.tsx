import { Box, CircularProgress } from '@mui/material'
import * as React from 'react'
import { ControlledScreen } from '../../../ControlledScreen'
import { useChromecastReceiverId } from '../useChromecastReceiverId'

export const Cast: React.FunctionComponent = () => {
	const id = useChromecastReceiverId()

	if (id === null) {
		// @TODO: move styles to CSS
		return (
			<Box
				sx={{
					display: 'grid',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress size={100} />
			</Box>
		)
	}

	return <ControlledScreen id={id} />
}
