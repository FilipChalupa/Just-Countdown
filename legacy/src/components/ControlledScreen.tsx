import * as React from 'react'
import { FullScreenCountdown } from '../../../components/FullScreenCountdown'
import { useChromecastSenderSession } from '../chromecast/sender/useChromecastSenderSession'
import { useRoomState } from '../utilities/useRoomState'
import { Countdown } from './Countdown'

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
