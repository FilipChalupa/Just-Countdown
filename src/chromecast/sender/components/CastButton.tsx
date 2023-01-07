import CastIcon from '@mui/icons-material/Cast'
import CastConnectedIcon from '@mui/icons-material/CastConnected'
import { Button } from '@mui/material'
import { FunctionComponent } from 'react'
import { useChromecastSender } from '../useChromecastSender'
import { useChromecastSenderSession } from '../useChromecastSenderSession'

export interface CastButtonProps {
	id: string
}

export const CastButton: FunctionComponent<CastButtonProps> = ({ id }) => {
	const { cast } = useChromecastSender()
	const session = useChromecastSenderSession(id)

	if (cast === null) {
		return null
	}

	return (
		<Button
			variant="contained"
			onClick={() => {
				if (session === null) {
					cast.framework.CastContext.getInstance().requestSession()
				} else {
					cast.framework.CastContext.getInstance().endCurrentSession(true)
				}
			}}
			size="large"
			fullWidth
			endIcon={session === null ? <CastIcon /> : <CastConnectedIcon />}
		>
			{session === null ? 'Cast' : session.name}
		</Button>
	)
}
