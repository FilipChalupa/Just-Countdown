import * as React from 'react'
import { getLocalTime } from '../../../utilities/date'
import { useGetParameter } from '../utilities/useQuery'
import { Countdown } from './Countdown'
import { FullScreenCountdown } from './FullScreenCountdown'

export const Run: React.FunctionComponent = () => {
	const [end, setEnd] = React.useState(getLocalTime())

	const seconds = parseInt(useGetParameter('seconds') ?? '') || 60
	const showHours = useGetParameter('showHours') !== null
	const flashOnZero = useGetParameter('flashOnZero') !== null

	React.useEffect(() => {
		setEnd(new Date(getLocalTime().getTime() + seconds * 1000 + 999))
	}, [seconds])

	return (
		<FullScreenCountdown>
			<Countdown
				showHours={showHours}
				end={end}
				useLocalTime
				flashOnZero={flashOnZero}
				reactiveFontSize
			/>
		</FullScreenCountdown>
	)
}
