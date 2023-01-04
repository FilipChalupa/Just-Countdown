import { db, FieldValue } from './db'

const TIME_DIFFERENCE_CACHE_KEY = 'time-difference'

export const getLocalTime = () => {
	return new Date()
}

const getTimeDifference = async () => {
	const collection = db.collection('timeSynchronization')
	const documentReference = collection.doc()
	const localStart = getLocalTime()
	await documentReference.set({
		server: FieldValue.serverTimestamp(),
	})
	const document = await documentReference.get()
	const localEnd = getLocalTime()

	const local = new Date(
		localStart.getTime() + (localEnd.getTime() - localStart.getTime()) / 2,
	)
	const server = document.data()?.server.toDate() ?? local
	documentReference.delete()

	return server.getTime() - local.getTime()
}

export const getServerTime = (() => {
	let timeDifference =
		parseInt(localStorage.getItem(TIME_DIFFERENCE_CACHE_KEY) ?? '') || 0

	getTimeDifference().then((x) => {
		timeDifference = x
		localStorage.setItem(TIME_DIFFERENCE_CACHE_KEY, `${timeDifference}`)
	})

	return () => new Date(getLocalTime().getTime() + timeDifference)
})()
