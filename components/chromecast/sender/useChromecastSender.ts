import { useEffect } from 'react'
import { useChromecastCafSender } from 'react-chromecast-caf'

let initialized = false

export const useChromecastSender = () => {
	const sender = useChromecastCafSender()

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
