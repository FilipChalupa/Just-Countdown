/// <reference types="chromecast-caf-sender" />

import { useEffect, useState } from 'react'

type Sender = {
	chrome: typeof chrome
	cast: typeof cast
}

const load = (() => {
	let promise: Promise<Sender> | null = null

	return () => {
		if (promise === null) {
			promise = new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.src =
					'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
				document.body.appendChild(script)
				let timer: ReturnType<typeof setTimeout>
				const loop = () => {
					if ('chrome' in window && 'cast' in window) {
						clearTimeout(timer)
						cast.framework.CastContext.getInstance().setOptions({
							receiverApplicationId: '6DEA9775',
							autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
							language: 'en',
							resumeSavedSession: true,
						})
						resolve({
							chrome,
							cast,
						})
						return
					}
					timer = setTimeout(() => {
						loop()
					}, 50)
				}
				loop()
			})
		}
		return promise
	}
})()

export const useChromecastSender = () => {
	const [sender, setSender] = useState<Sender | { chrome: null; cast: null }>({
		chrome: null,
		cast: null,
	})

	useEffect(() => {
		load().then((sender) => {
			setSender(sender)
		})
	}, [])

	return sender
}
