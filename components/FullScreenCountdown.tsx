import clsx from 'clsx'
import * as React from 'react'
import { KeepAwake } from 'react-keep-awake'
import { useIsIframe } from '../utilities/useIsIframe'

const FlashingContext = React.createContext({
	startFlashing: () => {},
	stopFlashing: () => {},
	forceFlash: (forceFlash: boolean) => {},
	isFlashing: false,
})

export const useStartFlashing = () => {
	return React.useContext(FlashingContext).startFlashing
}
export const useStopFlashing = () => {
	return React.useContext(FlashingContext).stopFlashing
}
export const useForceFlash = (forceFlash: boolean) => {
	React.useContext(FlashingContext).forceFlash(forceFlash)
}
export const useIsFlashing = () => {
	return React.useContext(FlashingContext).isFlashing
}

export interface FullScreenCountdownProps {
	children: React.ReactNode
}

export const FullScreenCountdown: React.FunctionComponent<
	FullScreenCountdownProps
> = (props) => {
	const [isFlashingInternal, setIsFlashingInternal] = React.useState(false)
	const [isFlashingForced, setIsFlashingForced] = React.useState(false)
	const isIframe = useIsIframe()
	const isFlashing = isFlashingInternal || isFlashingForced

	const startFlashing = React.useCallback(() => {
		setIsFlashingInternal(true)
	}, [])
	const stopFlashing = React.useCallback(() => {
		setIsFlashingInternal(false)
	}, [])
	const forceFlash = React.useCallback((forceFlash: boolean) => {
		setIsFlashingForced(forceFlash)
	}, [])

	return (
		<FlashingContext.Provider
			value={{ startFlashing, stopFlashing, isFlashing, forceFlash }}
		>
			<div
				className={clsx(
					'fullScreenCountdown',
					isFlashing && 'is-flashing',
					isIframe && 'is-iframe',
				)}
				onAnimationEnd={stopFlashing}
			>
				{props.children}
			</div>
			<KeepAwake />
		</FlashingContext.Provider>
	)
}
