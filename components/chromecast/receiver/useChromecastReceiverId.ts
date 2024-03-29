import { useEffect, useState } from 'react'
import { useChromecastReceiver } from 'use-chromecast-caf-receiver'
import { chromecastMessageNamespace } from '../common/constants'

export const useChromecastReceiverId = () => {
	const [id, setId] = useState<string | null>(null)

	const { cast } = useChromecastReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		// @ts-ignore
		const context = cast.framework.CastReceiverContext.getInstance()

		if (context === null) {
			return
		}

		const handleMessage: SystemEventHandler = (event) => {
			if (
				// @ts-ignore
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

		// @ts-ignore
		const options = new cast.framework.CastReceiverOptions()
		options.disableIdleTimeout = true
		context.start(options)

		return () => {
			context.removeCustomMessageListener(
				chromecastMessageNamespace,
				handleMessage,
			)
		}
	}, [cast])

	return id
}
