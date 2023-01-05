import { useEffect, useState } from 'react'
import { useChromecastSender } from './useChromecastSender'

export const useChromecastSenderSession = (id: string) => {
	const { cast } = useChromecastSender()

	const [session, setSession] = useState<null | {
		name: string
	}>(null)

	useEffect(() => {
		if (cast === null) {
			return
		}
		const context = cast.framework.CastContext.getInstance()

		const callback = (event: cast.framework.SessionStateEventData) => {
			const isSessionStarted =
				event.sessionState === cast.framework.SessionState.SESSION_STARTED
			if (isSessionStarted) {
				// @TODO: fix invalid_parameter error
				console.log('sending', typeof id, id)
				context.getCurrentSession()?.sendMessage('urn:x-cast:my-id', { id })
			}
			setSession(
				isSessionStarted
					? {
							name: event.session.getCastDevice().friendlyName,
					  }
					: null,
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

	return session
}
