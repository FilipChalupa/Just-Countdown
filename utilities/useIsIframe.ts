import { useEffect, useState } from 'react'

export const useIsIframe = () => {
	const [isIframe, setIsIframe] = useState(false)

	useEffect(() => {
		setIsIframe(window !== window.parent)
	}, [])

	return isIframe
}
