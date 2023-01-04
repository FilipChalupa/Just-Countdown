import * as React from 'react'
import { useLocation } from 'react-router-dom'

export function useQuery() {
	return new URLSearchParams(useLocation().search)
}

export function useGetParameter(name: string) {
	const query = useQuery()
	const [value, setValue] = React.useState(query.get(name))

	React.useEffect(() => {
		const newValue = query.get(name)
		setValue(newValue)
	}, [query])

	return value
}
