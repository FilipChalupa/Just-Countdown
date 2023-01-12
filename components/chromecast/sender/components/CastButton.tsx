import CastIcon from '@mui/icons-material/Cast'
import CastConnectedIcon from '@mui/icons-material/CastConnected'
import { Button } from '@mui/material'
import * as React from 'react'
import { useChromecastSender } from '../useChromecastSender'
import { useChromecastSenderSession } from '../useChromecastSenderSession'

export interface CastButtonProps {
	id: string
}

export const CastButton: React.FunctionComponent<CastButtonProps> = ({
	id,
}) => {
	const { cast } = useChromecastSender()
	const session = useChromecastSenderSession(id)

	if (cast === null) {
		return null
	}

	// @TODO: handle not available session.state

	return (
		<Button
			variant="contained"
			onClick={() => {
				if (session.state === 'connected') {
					cast.framework.CastContext.getInstance().endCurrentSession(true)
				} else {
					cast.framework.CastContext.getInstance().requestSession()
				}
			}}
			size="large"
			fullWidth
			disabled={session.state === 'loading'}
			endIcon={
				session.state === 'connected' ? <CastConnectedIcon /> : <CastIcon />
			}
		>
			<span className='castButton-text'>
				{session.state === 'connected' ? session.name : 'Cast'}
			</span>
		</Button>
	)
}
