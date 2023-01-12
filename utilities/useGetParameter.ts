import { useRouter } from 'next/router'

export function useGetParameter(name: string) {
	const router = useRouter()
	const value = router.query[name]

	return Array.isArray(value) ? null : value ?? null
}
