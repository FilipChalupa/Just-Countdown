import * as React from 'react'
import { useLocation } from 'react-router-dom'

export function useQuery() {
	const { search } = useLocation()
	return React.useMemo(() => new URLSearchParams(search), [search])
}

export function useGetParameter(name: string) {
	const query = useQuery()

	return query.get(name)
}
