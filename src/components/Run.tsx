import * as React from 'react'
import { Countdown } from './Countdown'
import { useGetParameter } from '../utils/useQuery'
import { FullScreenCountdown } from './FullScreenCountdown'
import { getLocalTime } from '../utils/date'

export const Run: React.SFC = () => {
	const [end, setEnd] = React.useState(getLocalTime())

	const seconds = parseInt(useGetParameter('seconds')) || 60

	const showHours = useGetParameter('showHours') !== null

	React.useEffect(() => {
		setEnd(new Date(getLocalTime().getTime() + seconds * 1000))
	}, [seconds])

	return (
		<FullScreenCountdown>
			<Countdown showHours={showHours} end={end} useLocalTime />
		</FullScreenCountdown>
	)
}
