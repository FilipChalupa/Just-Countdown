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
