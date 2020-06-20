import * as React from 'react'
import { Countdown } from './Countdown'
import { useGetParameter } from '../utils/useQuery'

export const Run: React.SFC = () => {
	const [end, setEnd] = React.useState(new Date())

	const seconds = parseInt(useGetParameter('seconds')) || 60

	React.useEffect(() => {
		setEnd(new Date(new Date().getTime() + seconds * 1000))
	}, [seconds])

	return (
		<>
			<Countdown showHours end={end} />
		</>
	)
}
