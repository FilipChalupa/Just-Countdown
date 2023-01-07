import { useEffect, useState } from 'react'
import { useChromecastReceiver } from 'use-chromecast-caf-receiver'

export const useChromecastReceiverId = () => {
	const [id, setId] = useState<string | null>(null)

	const { cast } = useChromecastReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		const castSession = cast.framework.CastReceiverContext.getInstance()

		if (castSession === null) {
			return
		}

		// const callback = (namespace: string, message: string) => {
		// 	console.log(namespace, message)
		// 	setId(message)
		// }
		castSession.addCustomMessageListener('urn:x-cast:id', () => {})

		return () => {
			castSession.removeCustomMessageListener('urn:x-cast:id', () => {})
		}
	}, [cast])

	return id
}
