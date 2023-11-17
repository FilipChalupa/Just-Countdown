import clsx from 'clsx'
import * as React from 'react'
import { doubleDigits } from '../utilities/doubleDigits'
import { calculateRamainingSeconds } from '../utilities/roomState'
import { secondsToTimeComponents } from '../utilities/secondsToTimeComponents'

export interface CountdownProps {
	id?: string
	paused?: Date | null
	end: Date
	showHours?: boolean
	reactiveFontSize?: boolean
	flashOnZero?: boolean
	forceFlash?: boolean
	useLocalTime?: boolean
	message?: string
}

export const Countdown: React.FunctionComponent<CountdownProps> = ({
	id,
	end,
	paused = null,
	showHours = false,
	reactiveFontSize = false,
	useLocalTime = false,
	flashOnZero = false,
	forceFlash = false,
	message,
}) => {
	const [remainingSeconds, setRemainingSeconds] = React.useState(0)

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

	React.useEffect(() => {
		window.parent?.postMessage(
			{
				id,
				formattedTime,
				remainingTimeInSeconds: remainingSeconds,
				isPaused: paused !== null,
				showHours,
			},
			'*',
		)
	}, [formattedTime, id, paused, remainingSeconds, showHours])

	const lastMessage = React.useRef('')
	lastMessage.current = message || lastMessage.current
	const isMessageVisible = Boolean(message)

	return (
		<div
			className={clsx(
				'time',
				showHours && 'view-showHours',
				reactiveFontSize && 'view-reactiveFontSize',
			)}
		>
			{forceFlash ? (
				<div className="forceFlash" />
			) : (
				remainingSeconds === 0 && flashOnZero && <div className="flash" />
			)}
			{formattedTime}
			{message !== undefined && (
				<>
					<div className={clsx('message', isMessageVisible && 'is-visible')}>
						{lastMessage.current}
					</div>
				</>
			)}
		</div>
	)
}
