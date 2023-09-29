import * as React from 'react'
import { useRoomState } from '../utilities/useRoomState'
import { Countdown } from './Countdown'
import { FullScreenCountdown } from './FullScreenCountdown'
import { useChromecastSenderSession } from './chromecast/sender/useChromecastSenderSession'

export interface ControlledScreenProps {
	id: string
}

export const ControlledScreen: React.FunctionComponent<
	ControlledScreenProps
> = ({ id }) => {
	const roomState = useRoomState(id)
	useChromecastSenderSession(id)

	return (
		<FullScreenCountdown>
			{roomState.isLoaded && (
				<Countdown
					id={id}
					end={roomState.end}
					showHours={roomState.showHours}
					flashOnZero={roomState.flashOnZero}
					paused={roomState.paused}
					reactiveFontSize
				/>
			)}
		</FullScreenCountdown>
	)
}
