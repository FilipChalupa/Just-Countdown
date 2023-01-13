import clsx from 'clsx'
import * as React from 'react'
import { doubleDigits } from '../utilities/doubleDigits'
import { calculateRamainingSeconds } from '../utilities/roomState'
import { secondsToTimeComponents } from '../utilities/secondsToTimeComponents'
import { useStartFlashing, useStopFlashing } from './FullScreenCountdown'

export interface CountdownProps {
	paused?: Date | null
	end: Date
	showHours?: boolean
	reactiveFontSize?: boolean
	flashOnZero?: boolean
	useLocalTime?: boolean
}

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
		[flashOnZero, startFlashing, stopFlashing],
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
		setRemainingSeconds(calculateRamainingSeconds(end, paused, useLocalTime))
	}, [end, paused, setRemainingSeconds, useLocalTime])

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

	const { seconds, minutes, hours } = React.useMemo(
		() => secondsToTimeComponents(remainingSeconds, showHours),
		[remainingSeconds, showHours],
	)

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
