import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import * as React from 'react'
import { db } from './db'
import { getDefaultRoomState, RoomState } from './roomState'

const getNotLoadedRoomState = () => ({
	...getDefaultRoomState(),
	isLoaded: false,
})

interface RoomStateWithLoadState extends RoomState {
	isLoaded: boolean
}

export function useRoomState(id: string) {
	const [roomState, setRoomState] = React.useState<RoomStateWithLoadState>(() =>
		getNotLoadedRoomState(),
	)

	React.useEffect(() => {
		setRoomState(getNotLoadedRoomState())
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
			const newRoomState: RoomStateWithLoadState = {
				...getDefaultRoomState(),
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
