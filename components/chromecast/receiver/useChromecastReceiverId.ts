import { useEffect, useState } from 'react'
import { useChromecastCafReceiver } from 'react-chromecast-caf'
import { chromecastMessageNamespace } from '../common/constants'

export const useChromecastReceiverId = () => {
	const [id, setId] = useState<string | null>(null)

	const { cast } = useChromecastCafReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		const context = cast.framework.CastReceiverContext.getInstance()

		if (context === null) {
			return
		}

		const handleMessage: CustomMessageHandler = (event) => {
			if (
				event.type !== 'message' ||
				typeof event.data !== 'object' ||
				event.data === null
			) {
				return
			}
			if (typeof event.data.id === 'string') {
				setId(event.data.id)
			}
		}

		context.addCustomMessageListener(chromecastMessageNamespace, handleMessage)

		const options = new cast.framework.CastReceiverOptions()
		options.disableIdleTimeout = true
		context.start(options)

		return () => {
			context.removeCustomMessageListener(
				chromecastMessageNamespace,
				handleMessage as unknown as SystemEventHandler, // @TODO: Investigate. Maybe a bug in typings of the library.
			)
		}
	}, [cast])

	return id
}
