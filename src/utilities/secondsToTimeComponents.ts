export const secondsToTimeComponents = (
	secondsTotal: number,
	allowHours = true,
) => {
	const seconds = secondsTotal % 60
	const minutes = ((): number => {
		const minutes = Math.floor(secondsTotal / 60)
		if (allowHours) {
			return minutes % 60
		}
		return minutes
	})()
	const hours = ((): null | number => {
		if (allowHours) {
			return Math.floor(secondsTotal / (60 * 60))
		}
		return null
	})()

	return { hours, minutes, seconds }
}
