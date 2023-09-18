import clsx from 'clsx'
import * as React from 'react'
import { KeepAwake } from 'react-keep-awake'
import { useIsIframe } from '../utilities/useIsIframe'

const FlashingContext = React.createContext({
	startFlashing: () => {},
	stopFlashing: () => {},
	isFlashing: false,
})

export const useStartFlashing = () => {
	return React.useContext(FlashingContext).startFlashing
}
export const useStopFlashing = () => {
	return React.useContext(FlashingContext).stopFlashing
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
	const [isFlashing, setIsFlashing] = React.useState(false)
	const isIframe = useIsIframe()

	const startFlashing = React.useCallback(() => {
		setIsFlashing(true)
	}, [])
	const stopFlashing = React.useCallback(() => {
		setIsFlashing(false)
	}, [])

	return (
		<FlashingContext.Provider
			value={{ startFlashing, stopFlashing, isFlashing }}
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
