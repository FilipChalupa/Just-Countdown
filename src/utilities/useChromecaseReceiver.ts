/// <reference types="chromecast-caf-receiver" />

import { useEffect, useState } from 'react'

type Receiver = {
	cast: typeof cast
}

const load = (() => {
	let promise: Promise<Receiver> | null = null

	return () => {
		if (promise === null) {
			promise = new Promise((resolve, reject) => {
				const script = document.createElement('script')
				script.src =
					'https://www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js'
				document.body.appendChild(script)

				const loop = () => {
					if ('cast' in window && 'framework' in cast) {
						try {
							// @ts-ignore
							const context = cast.framework.CastReceiverContext.getInstance()
							context.start()
						} catch (error) {
							document.body.textContent = error.message
						}
						resolve({
							cast,
						})
						return
					}
					setTimeout(() => {
						loop()
					}, 100)
				}
				loop()
			})
		}
		return promise
	}
})()

export const useChromecaseReceiver = () => {
	const [receiver, setReceiver] = useState<Receiver | { cast: null }>({
		cast: null,
	})

	useEffect(() => {
		load().then((sender) => {
			setReceiver(sender)
		})
	}, [])

	return receiver
}
