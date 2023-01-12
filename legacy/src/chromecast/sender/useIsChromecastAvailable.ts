import { useChromecastSender } from './useChromecastSender'

export const useIsChromecastSenderAvailable = () =>
	useChromecastSender().cast !== null
