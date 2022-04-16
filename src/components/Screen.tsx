import * as React from 'react'
import ScreenWakeLock from 'screen-wake-lock'
import { useGetParameter } from '../utils/useQuery'
import { useRoomState } from '../utils/useRoomState'
import { Countdown } from './Countdown'
import { FullScreenCountdown } from './FullScreenCountdown'

export const Screen: React.FunctionComponent = () => {
	const id = useGetParameter('id')

	const roomState = useRoomState(id)

	return (
		<FullScreenCountdown>
			{roomState.isLoaded && (
				<Countdown
					end={roomState.end}
					showHours={roomState.showHours}
					paused={roomState.paused}
				/>
			)}
			<ScreenWakeLock />
		</FullScreenCountdown>
	)
}
