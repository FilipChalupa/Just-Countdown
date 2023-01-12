import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { db } from '../../utilities/db'
import { RoomState } from '../../utilities/roomState'
import { getDefaultRoomState } from './../../utilities/roomState'

type Data = {
	status: 'ok' | 'error'
	message: string
}

const RequestParameters = z.object({
	id: z.string(),
	start: z.string().optional(),
	pause: z.string().optional(),
	togglePause: z.string().optional(),
	showHours: z.string().optional(),
	hideHours: z.string().optional(),
	toggleHours: z.string().optional(),
	set: z.string().optional(),
	adjust: z.string().optional(),
})

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<Data>,
) {
	const result = RequestParameters.safeParse(request.query)
	if (!result.success) {
		response.status(400).json({ status: 'error', message: 'Invalid request.' })
		return
	}
	const {
		id,
		start,
		pause,
		togglePause,
		showHours,
		hideHours,
		toggleHours,
		set,
		adjust,
	} = result.data

	const roomDocumentReference = doc(db, 'rooms', id)
	const roomDocumentSnapshot = await getDoc(roomDocumentReference)
	if (roomDocumentSnapshot.exists() === false) {
		await setDoc(roomDocumentReference, {
			name: id,
		})
	}
	const data: RoomState = {
		...getDefaultRoomState(),
		...(roomDocumentSnapshot.data() ?? {}),
	}
	if (start !== undefined) {
	} else if (pause !== undefined) {
	} else if (togglePause !== undefined) {
	}
	if (showHours !== undefined) {
		await updateDoc(roomDocumentReference, { showHours: true })
	} else if (hideHours !== undefined) {
		await updateDoc(roomDocumentReference, { showHours: false })
	} else if (toggleHours !== undefined) {
		await updateDoc(roomDocumentReference, { showHours: !data.showHours })
	}
	if (set !== undefined) {
	} else if (adjust !== undefined) {
	}
	response
		.status(200)
		.json({ status: 'ok', message: 'Request fulfilled successfully.' })
}
