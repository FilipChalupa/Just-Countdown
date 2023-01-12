import clsx from 'clsx'
import * as React from 'react'
import ScreenWakeLock from 'screen-wake-lock/lib/ScreenWakeLock'

const FlashingContext = React.createContext({
	startFlashing: () => {},
	stopFlashing: () => {},
})

export const useStartFlashing = () => {
	return React.useContext(FlashingContext).startFlashing
}
export const useStopFlashing = () => {
	return React.useContext(FlashingContext).stopFlashing
}

export interface FullScreenCountdownProps {
	children: React.ReactNode
}

export const FullScreenCountdown: React.FunctionComponent<
	FullScreenCountdownProps
> = (props) => {
	const [isFlashing, setIsFlashing] = React.useState(false)

	const startFlashing = React.useCallback(() => {
		setIsFlashing(true)
	}, [])
	const stopFlashing = React.useCallback(() => {
		setIsFlashing(false)
	}, [])

	return (
		<FlashingContext.Provider value={{ startFlashing, stopFlashing }}>
			<div
				className={clsx('fullScreenCountdown', isFlashing && 'is-flashing')}
				onAnimationEnd={stopFlashing}
			>
				{props.children}
			</div>
			<ScreenWakeLock />
		</FlashingContext.Provider>
	)
}
