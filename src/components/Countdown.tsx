import * as React from 'react'

export interface CountdownProps {
	paused?: Date
	end: Date
	showHours?: boolean
}

const doubleDigits = (input: number) => input.toString().padStart(2, '0')

export const Countdown: React.SFC<CountdownProps> = (props) => {
	const { end, paused, showHours } = props
	const [remainingSeconds, setRemainingSeconds] = React.useState(0)

	const updateRemainingSeconds = React.useCallback(() => {
		const startTimestamp = (paused || new Date()).getTime()
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
			timer = window.setTimeout(tick, 1000) // @TODO: calculate delay
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
		<div className="time">
			{showHours && <>{doubleDigits(hours)}:</>}
			{doubleDigits(minutes)}:{doubleDigits(seconds)}
		</div>
	)
}
