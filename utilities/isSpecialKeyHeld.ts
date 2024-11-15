export const isSpecialKeyHeld = (event: KeyboardEvent) =>
	event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
