import * as React from 'react'
import { Countdown } from './Countdown'
import { useGetParameter } from '../utils/useQuery'
import { FullScreenCountdown } from './FullScreenCountdown'
import { getLocalTime } from '../utils/date'

export const Run: React.SFC = () => {
	const [end, setEnd] = React.useState(getLocalTime())

	const seconds = parseInt(useGetParameter('seconds')) || 60

	React.useEffect(() => {
		setEnd(new Date(getLocalTime().getTime() + (seconds + 1) * 1000))
	}, [seconds])

	return (
		<FullScreenCountdown>
			<Countdown showHours end={end} useLocalTime />
		</FullScreenCountdown>
	)
}
