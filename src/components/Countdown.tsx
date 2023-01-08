import clsx from 'clsx'
import * as React from 'react'
import { getLocalTime, getServerTime } from '../utilities/date'
import { useStartFlashing, useStopFlashing } from './FullScreenCountdown'

export interface CountdownProps {
	paused?: Date | null
	end: Date
	showHours?: boolean
	reactiveFontSize?: boolean
	flashOnZero?: boolean
	useLocalTime?: boolean
}

const doubleDigits = (input: number) => input.toString().padStart(2, '0')

const useRemainingSeconds = (flashOnZero: boolean) => {
	const startFlashing = useStartFlashing()
	const stopFlashing = useStopFlashing()
	const [remainingSeconds, setRemainingSeconds] = React.useState(0)
	const previousRemainingSeconds = React.useRef(remainingSeconds)

	const set = React.useCallback(
		(newValue: number) => {
			if (
				newValue === 0 &&
				previousRemainingSeconds.current === 1 &&
				flashOnZero
			) {
				startFlashing()
			} else if (newValue !== 0 && previousRemainingSeconds.current === 0) {
				stopFlashing()
			}
			previousRemainingSeconds.current = newValue
			setRemainingSeconds(newValue)
		},
		[startFlashing],
	)

	return [remainingSeconds, set] as const
}

export const Countdown: React.FunctionComponent<CountdownProps> = ({
	end,
	paused = null,
	showHours = false,
	reactiveFontSize = false,
	useLocalTime = false,
	flashOnZero = false,
}) => {
	const [remainingSeconds, setRemainingSeconds] =
		useRemainingSeconds(flashOnZero)

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
	}, [updateRemainingSeconds])

	React.useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		const tick = () => {
			updateRemainingSeconds()
			timer = setTimeout(tick, 50) // @TODO: calculate exact delay
		}
		tick()
		return () => {
			clearTimeout(timer)
		}
	}, [updateRemainingSeconds])

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
		<div
			className={clsx(
				'time',
				showHours && 'view-showHours',
				reactiveFontSize && 'view-reactiveFontSize',
			)}
		>
			{hours !== null && <>{doubleDigits(hours)}:</>}
			{doubleDigits(minutes)}:{doubleDigits(seconds)}
		</div>
	)
}
