import { useEffect } from 'react'
import { useChromecastSender as useChromecastSenderFromLibrary } from 'use-chromecast-caf-sender'

let initialized = false

export const useChromecastSender = () => {
	const sender = useChromecastSenderFromLibrary()

	useEffect(() => {
		const { chrome, cast } = sender
		if (initialized === false && chrome && cast) {
			initialized = true
			cast.framework.CastContext.getInstance().setOptions({
				receiverApplicationId: '6DEA9775',
				autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED,
				language: 'en',
				resumeSavedSession: true,
			})
		}
	}, [sender])

	return sender
}
