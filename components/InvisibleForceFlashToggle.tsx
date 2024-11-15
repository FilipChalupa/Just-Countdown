import { useEffect, type FunctionComponent } from 'react'
import { isInteractiveElementFocused } from '../utilities/isInteractiveElementFocused'
import { isSpecialKeyHeld } from '../utilities/isSpecialKeyHeld'

export type InvisibleForceFlashToggleProps = {
	onToggle: () => void
}

export const InvisibleForceFlashToggle: FunctionComponent<
	InvisibleForceFlashToggleProps
> = ({ onToggle }) => {
	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			if (isInteractiveElementFocused(event) || isSpecialKeyHeld(event)) {
				return
			}
			if (event.code === 'KeyF') {
				onToggle()
			}
		}
		window.addEventListener('keydown', callback)
		return () => {
			window.removeEventListener('keydown', callback)
		}
	}, [onToggle])

	return null
}
