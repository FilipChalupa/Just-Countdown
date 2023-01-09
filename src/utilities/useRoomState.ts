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
		return db
			.collection('rooms')
			.doc(id)
			.onSnapshot(function (document) {
				if (document.exists) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const data: any = document.data()
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
				} else {
					document.ref.set({
						name: id,
					})
				}
			})
	}, [id])

	return roomState
}
