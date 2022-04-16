import * as React from 'react'
import ScreenWakeLock from 'screen-wake-lock'
import { getLocalTime } from '../utils/date'
import { useGetParameter } from '../utils/useQuery'
import { Countdown } from './Countdown'
import { FullScreenCountdown } from './FullScreenCountdown'

export const Run: React.FunctionComponent = () => {
	const [end, setEnd] = React.useState(getLocalTime())

	const seconds = parseInt(useGetParameter('seconds')) || 60

	const showHours = useGetParameter('showHours') !== null

	React.useEffect(() => {
		setEnd(new Date(getLocalTime().getTime() + seconds * 1000))
	}, [seconds])

	return (
		<FullScreenCountdown>
			<Countdown showHours={showHours} end={end} useLocalTime />
			<ScreenWakeLock />
		</FullScreenCountdown>
	)
}
