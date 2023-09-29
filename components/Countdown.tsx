import clsx from 'clsx'
import * as React from 'react'
import { doubleDigits } from '../utilities/doubleDigits'
import { calculateRamainingSeconds } from '../utilities/roomState'
import { secondsToTimeComponents } from '../utilities/secondsToTimeComponents'
import {
	useIsFlashing,
	useStartFlashing,
	useStopFlashing,
} from './FullScreenCountdown'

export interface CountdownProps {
	id?: string
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
	id,
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

	const formattedTime = React.useMemo(() => {
		const formattedHours = hours === null ? '' : `${doubleDigits(hours)}:`
		return `${formattedHours}${doubleDigits(minutes)}:${doubleDigits(seconds)}`
	}, [hours, minutes, seconds])

	const isFlashing = useIsFlashing()

	React.useEffect(() => {
		window.parent?.postMessage(
			{
				id,
				formattedTime,
				remainingTimeInSeconds: remainingSeconds,
				isFlashing,
				isPaused: paused !== null,
				showHours,
			},
			'*',
		)
	}, [formattedTime, id, isFlashing, paused, remainingSeconds, showHours])

	return (
		<div
			className={clsx(
				'time',
				showHours && 'view-showHours',
				reactiveFontSize && 'view-reactiveFontSize',
			)}
		>
			{formattedTime}
		</div>
	)
}
