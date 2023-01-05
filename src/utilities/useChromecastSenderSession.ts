import { useEffect, useState } from 'react'
import { useChromecastSender } from './useChromecastSender'

export const useChromecastSenderSession = () => {
	const { cast } = useChromecastSender()

	const [isCasting, setIsCasting] = useState(false)

	useEffect(() => {
		if (cast === null) {
			return
		}
		const context = cast.framework.CastContext.getInstance()

		const callback = (event: cast.framework.SessionStateEventData) => {
			console.log('session state changed')
			console.log(event)
			setIsCasting(
				event.sessionState === cast.framework.SessionState.SESSION_STARTED,
			)
		}
		context.addEventListener(
			cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
			callback,
		)

		return () => {
			context.removeEventListener(
				cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
				callback,
			)
		}
	}, [cast])

	return { isCasting }
}
