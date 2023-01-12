import {
	addDoc,
	collection,
	deleteDoc,
	getDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { db } from './db'

const TIME_DIFFERENCE_CACHE_KEY = 'time-difference'

export const getLocalTime = () => {
	return new Date()
}

const getTimeDifference = async () => {
	const documentReference = await addDoc(
		collection(db, 'timeSynchronization'),
		{
			server: serverTimestamp(),
		},
	)
	const localStart = getLocalTime()
	const document = await getDoc(documentReference)
	const localEnd = getLocalTime()

	const local = new Date(
		localStart.getTime() + (localEnd.getTime() - localStart.getTime()) / 2,
	)
	const server = document.data()?.server.toDate() ?? local
	deleteDoc(documentReference)

	return server.getTime() - local.getTime()
}

export const getServerTime: () => Date = (() => {
	if (typeof window === 'undefined') {
		return () => getLocalTime()
	}

	const timeDifference =
		parseInt(localStorage.getItem(TIME_DIFFERENCE_CACHE_KEY) ?? '') || 0

	getTimeDifference().then((timeDifference) => {
		localStorage.setItem(TIME_DIFFERENCE_CACHE_KEY, `${timeDifference}`)
	})

	return () => new Date(getLocalTime().getTime() + timeDifference)
})()
