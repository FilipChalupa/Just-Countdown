import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore'
import { getServerTime } from './date'
export interface RoomState {
	name: string
	showHours: boolean
	flashOnZero: boolean
	end: Date
	paused: Date | null
}

export const getDefaultRoomState: () => RoomState = () => ({
	name: '…',
	showHours: true,
	flashOnZero: false,
	end: new Date(),
	paused: new Date(),
})

export const cleanRemoteRoomStateData = (data: any) => {
	const cleanRoomState: RoomState = {
		...getDefaultRoomState(),
		...data,
	}
	if (data.end) {
		cleanRoomState.end = new Date((data.end?.seconds || 0) * 1000)
	}
	if (data.paused) {
		cleanRoomState.paused = new Date((data.paused?.seconds || 0) * 1000)
	}
	return cleanRoomState
}

export const toggleShowHours = async (
	roomState: RoomState,
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	await updateDoc(roomDocumentReference, {
		showHours: !roomState.showHours,
	})
}

export const showHours = async (
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	await updateDoc(roomDocumentReference, {
		showHours: true,
	})
}

export const hideHours = async (
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	await updateDoc(roomDocumentReference, {
		showHours: false,
	})
}

export const togglePaused = async (
	roomState: RoomState,
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	if (roomState.paused === null) {
		await pause(roomState, roomDocumentReference)
	} else {
		await start(roomState, roomDocumentReference)
	}
}

export const pause = async (
	roomState: RoomState,
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	if (roomState.paused !== null) {
		return
	}
	const paused = new Date(getServerTime().getTime() + 1000)
	await updateDoc(roomDocumentReference, {
		paused,
	})
}

export const start = async (
	roomState: RoomState,
	roomDocumentReference: DocumentReference<DocumentData>,
) => {
	if (roomState.paused === null) {
		return
	}
	const end = new Date(
		getServerTime().getTime() +
			roomState.end.getTime() -
			roomState.paused.getTime() +
			(1001 - ((roomState.end.getTime() - roomState.paused.getTime()) % 1000)),
	)
	await updateDoc(roomDocumentReference, {
		paused: null,
		end,
	})
}

export const setCountdown = async (
	roomDocumentReference: DocumentReference<DocumentData>,
	seconds: number,
	pause = true,
) => {
	await updateDoc(roomDocumentReference, {
		end: new Date(getServerTime().getTime() + seconds * 1000),
		paused: pause ? getServerTime() : null,
	})
}
