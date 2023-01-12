import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import * as React from 'react'
import { db } from './db'
import {
	cleanRemoteRoomStateData,
	getDefaultRoomState,
	RoomState,
} from './roomState'

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
			setRoomState({
				...cleanRemoteRoomStateData(roomDocumentSnapshot.data()),
				isLoaded: true,
			})
		})
	}, [id])

	return roomState
}
