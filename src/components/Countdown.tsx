import * as React from 'react'

export interface CountdownProps {
	paused?: Date
	end: Date
}

export const Countdown: React.SFC<CountdownProps> = (props) => {
	const { end, paused } = props
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

	return (
		<div>
			<div>{remainingSeconds}</div>
			<pre>{JSON.stringify(props)}</pre>
		</div>
	)
}
