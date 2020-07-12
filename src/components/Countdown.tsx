import * as React from 'react'
import { getLocalTime, getServerTime } from '../utils/date'

export interface CountdownProps {
	paused?: Date | null
	end: Date
	showHours?: boolean
	useLocalTime?: boolean
}

const doubleDigits = (input: number) => input.toString().padStart(2, '0')

export const Countdown: React.SFC<CountdownProps> = (props) => {
	const { end, paused, showHours, useLocalTime } = props
	const [remainingSeconds, setRemainingSeconds] = React.useState(0)

	const updateRemainingSeconds = React.useCallback(() => {
		const startTimestamp = (
			paused || (useLocalTime ? getLocalTime : getServerTime)()
		).getTime()
		const endTimestamp = end.getTime()
		const difference = Math.floor((endTimestamp - startTimestamp) / 1000)

		setRemainingSeconds(Math.max(0, difference))
	}, [end, paused])

	React.useEffect(() => {
		updateRemainingSeconds()
	}, [])

	React.useEffect(() => {
		let timer: number
		const tick = () => {
			updateRemainingSeconds()
			timer = window.setTimeout(tick, 50) // @TODO: calculate exact delay
		}
		tick()
		return () => {
			clearTimeout(timer)
		}
	}, [paused, end])

	const seconds = remainingSeconds % 60
	let minutes = Math.floor(remainingSeconds / 60)
	const hours = ((): null | number => {
		if (showHours) {
			minutes = minutes % 60
			return Math.floor(remainingSeconds / (60 * 60))
		}
		return null
	})()

	return (
		<div className={`time ${showHours ? 'view-showHours' : ''}`}>
			{showHours && <>{doubleDigits(hours)}:</>}
			{doubleDigits(minutes)}:{doubleDigits(seconds)}
		</div>
	)
}
