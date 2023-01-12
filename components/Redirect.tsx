import { useRouter } from 'next/router'
import { FunctionComponent, useEffect } from 'react'

export interface RedirectProps {
	to: string
}

export const Redirect: FunctionComponent<RedirectProps> = ({ to }) => {
	const router = useRouter()

	useEffect(() => {
		router.push(to)
	}, [router, to])

	return null
}
