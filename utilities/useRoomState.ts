import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import * as React from 'react'
import { db } from './db'

export interface RoomState {
	name: string
	showHours: boolean
	flashOnZero: boolean
	end: Date
	paused: Date | null
	isLoaded: boolean
}

const defaultRoomState: RoomState = {
	name: '…',
	showHours: true,
	flashOnZero: false,
	end: new Date(),
	paused: new Date(),
	isLoaded: false,
}

export function useRoomState(id: string) {
	const [roomState, setRoomState] = React.useState<RoomState>(defaultRoomState)

	React.useEffect(() => {
		setRoomState(defaultRoomState)
		collection(db, 'rooms')
		const roomDocumentReference = doc(db, 'rooms', id)
		return onSnapshot(roomDocumentReference, (roomDocumentSnapshot) => {
			if (roomDocumentSnapshot.exists() === false) {
				setDoc(roomDocumentReference, {
					name: id,
				})
				return
			}
			const data: any = roomDocumentSnapshot.data()
			const newRoomState = {
				...defaultRoomState,
				...data,
				isLoaded: true,
			}
			if (data.end) {
				newRoomState.end = new Date((data.end?.seconds || 0) * 1000)
			}
			if (data.paused) {
				newRoomState.paused = new Date((data.paused?.seconds || 0) * 1000)
			}
			setRoomState(newRoomState)
		})
	}, [id])

	return roomState
}
