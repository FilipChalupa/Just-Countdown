import * as React from 'react'

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

export const FullScreenCountdown: React.FunctionComponent = (props) => {
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
				className={`fullScreenCountdown${isFlashing ? ' is-flashing' : ''}`}
				onAnimationEnd={stopFlashing}
			>
				{props.children}
			</div>
		</FlashingContext.Provider>
	)
}
