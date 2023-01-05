import { useEffect, useState } from 'react'
import { useChromecaseReceiver } from './useChromecaseReceiver'

export const useChromecastReceiverId = () => {
	const [id, setId] = useState<string | null>(null)

	const { cast } = useChromecaseReceiver()

	useEffect(() => {
		if (cast === null) {
			return
		}
		const castSession =
			cast.framework.CastContext.getInstance().getCurrentSession()

		if (castSession === null) {
			return
		}

		const callback = (namespace: string, message: string) => {
			console.log(namespace, message)
			setId(message)
		}
		castSession.addMessageListener('urn:x-cast:id', callback)

		return () => {
			castSession.removeMessageListener('urn:x-cast:id', callback)
		}
	}, [cast])

	return id
}
