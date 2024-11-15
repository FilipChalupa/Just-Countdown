export const isInteractiveElementFocused = (event: KeyboardEvent) =>
	event.target instanceof HTMLInputElement ||
	event.target instanceof HTMLTextAreaElement ||
	event.target instanceof HTMLButtonElement ||
	event.target instanceof HTMLAnchorElement ||
	event.target instanceof HTMLSelectElement
