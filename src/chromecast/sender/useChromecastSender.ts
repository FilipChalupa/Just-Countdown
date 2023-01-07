import { useChromecastSender as useChromecastSenderFromLibrary } from 'use-chromecast-caf-sender'

export const useChromecastSender = () => {
	return useChromecastSenderFromLibrary((cast, chrome) => ({
		receiverApplicationId: '6DEA9775',
		autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED,
		language: 'en',
		resumeSavedSession: true,
	}))
}
