import * as React from 'react'
import ScreenWakeLock from 'screen-wake-lock'
import { useGetParameter } from '../utilities/useQuery'
import { useRoomState } from '../utilities/useRoomState'
import { Countdown } from './Countdown'
import { FullScreenCountdown } from './FullScreenCountdown'

export const Screen: React.FunctionComponent = () => {
	const id = useGetParameter('id')!

	const roomState = useRoomState(id)

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
			<ScreenWakeLock />
		</FullScreenCountdown>
	)
}
