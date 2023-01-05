import CastIcon from '@mui/icons-material/Cast'
import CastConnectedIcon from '@mui/icons-material/CastConnected'
import { Button } from '@mui/material'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { useChromecastSender } from '../utilities/useChromecastSender'
import { useChromecastSenderSession } from '../utilities/useChromecastSenderSession'

export const CastButton: FunctionComponent = () => {
	const { cast } = useChromecastSender()
	const session = useChromecastSenderSession()

	if (cast === null) {
		return null
	}

	return (
		<Button
			variant="contained"
			onClick={() => {
				if (session.isCasting) {
					cast.framework.CastContext.getInstance().endCurrentSession(true)
				} else {
					cast.framework.CastContext.getInstance().requestSession()
				}
			}}
			size="large"
			fullWidth
			endIcon={session.isCasting ? <CastConnectedIcon /> : <CastIcon />}
		>
			{session.isCasting ? 'Disconnect' : 'Cast'}
		</Button>
	)
}
