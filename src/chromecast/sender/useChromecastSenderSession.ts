import { useEffect, useState } from 'react'
import { chromecastMessageNamespace } from '../common/constants'
import { useChromecastSender } from './useChromecastSender'

type State =
	| {
			state: 'connected'
			name: string
	  }
	| {
			state: 'loading'
	  }
	| {
			state: 'not_connected'
	  }
	| {
			state: 'not_available'
	  }

export const useChromecastSenderSession = (id: string) => {
	const { cast } = useChromecastSender()

	const [session, setSession] = useState<State>({ state: 'not_available' })

	useEffect(() => {
		if (cast === null) {
			return
		}
		const context = cast.framework.CastContext.getInstance()

		const handleState = (state: cast.framework.SessionState) => {
			const isSessionStarted =
				state === cast.framework.SessionState.SESSION_STARTED
			if (isSessionStarted) {
				context
					.getCurrentSession()
					?.sendMessage(chromecastMessageNamespace, { id })
				setSession({
					state: 'connected',
					name:
						context.getCurrentSession()?.getCastDevice().friendlyName ??
						'Unknown',
				})
				return
			}
			if (
				state === cast.framework.SessionState.NO_SESSION ||
				state === cast.framework.SessionState.SESSION_ENDED ||
				state === cast.framework.SessionState.SESSION_START_FAILED
			) {
				setSession({
					state: 'not_connected',
				})
				return
			}
			setSession({
				state: 'loading',
			})
		}

		handleState(context.getSessionState())

		const callback = (event: cast.framework.SessionStateEventData) => {
			handleState(event.sessionState)
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
