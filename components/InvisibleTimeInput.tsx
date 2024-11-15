import { useEffect, useState, type FunctionComponent } from 'react'
import { isInteractiveElementFocused } from '../utilities/isInteractiveElementFocused'
import { isSpecialKeyHeld } from '../utilities/isSpecialKeyHeld'

export type InvisibleTimeInputProps = {
	onInput: (seconds: number) => void
	onTogglePause: () => void
}

export const InvisibleTimeInput: FunctionComponent<InvisibleTimeInputProps> = ({
	onInput,
	onTogglePause,
}) => {
	const [input, setInput] = useState('')

	useEffect(() => {
		const timer = setTimeout(() => {
			setInput('')
		}, 5000)

		return () => {
			clearTimeout(timer)
		}
	}, [input])

	useEffect(() => {
		const callback = (event: KeyboardEvent) => {
			if (isInteractiveElementFocused(event) || isSpecialKeyHeld(event)) {
				return
			}
			if (event.key === 'Enter') {
				if (input.length === 0) {
					onTogglePause()
				} else {
					const [seconds = 0, minutes = 0, hours = 0] = input
						.split(':')
						.map((part) => parseInt(part, 10) || 0)
						.reverse()
					const totalSeconds = seconds + minutes * 60 + hours * 60 * 60
					onInput(totalSeconds)
					setInput('')
				}
			} else if (event.code === 'Delete') {
				setInput('')
			} else if (event.code === 'Backspace') {
				setInput((input) => input.slice(0, -1))
			} else {
				const number = (() => {
					if (event.code.startsWith('Digit') && event.code.length === 6) {
						return event.code.substring(5)
					}
					if (event.code.startsWith('Numpad') && event.code.length === 7) {
						return event.code.substring(6)
					}
					return null
				})()
				setInput((input) => {
					if (number !== null) {
						return input + number
					}
					if (input.length > 0 && input.split(':').length <= 2) {
						return input + ':'
					}
					return input
				})
			}
		}
		window.addEventListener('keydown', callback)
		return () => {
			window.removeEventListener('keydown', callback)
		}
	}, [input, input.length, onInput, onTogglePause])

	return <div className="invisibleInput">{input}</div>
}
