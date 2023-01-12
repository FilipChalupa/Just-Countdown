import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { db } from '../../utilities/db'
import {
	cleanRemoteRoomStateData,
	hideHours,
	pause,
	showHours,
	start,
	togglePaused,
	toggleShowHours,
} from '../../utilities/roomState'

type Data = {
	status: 'ok' | 'error'
	message: string
}

const RequestParameters = z.object({
	id: z.string(),
	start: z.string().optional(),
	pause: z.string().optional(),
	togglePaused: z.string().optional(),
	showHours: z.string().optional(),
	hideHours: z.string().optional(),
	toggleHours: z.string().optional(),
	set: z.string().optional(),
	adjust: z.string().optional(),
	// @TODO: flash on zero
})

// @TODO: get server time - respect firebase time on server

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<Data>,
) {
	const result = RequestParameters.safeParse(request.query)
	if (!result.success) {
		response.status(400).json({ status: 'error', message: 'Invalid request.' })
		return
	}
	const parameters = result.data

	const roomDocumentReference = doc(db, 'rooms', parameters.id)
	const roomDocumentSnapshot = await getDoc(roomDocumentReference)
	if (roomDocumentSnapshot.exists() === false) {
		await setDoc(roomDocumentReference, {
			name: parameters.id,
		})
	}
	const roomState = cleanRemoteRoomStateData(roomDocumentSnapshot.data())
	if (parameters.start !== undefined) {
		await start(roomState, roomDocumentReference)
	} else if (parameters.pause !== undefined) {
		await pause(roomState, roomDocumentReference)
	} else if (parameters.togglePaused !== undefined) {
		await togglePaused(roomState, roomDocumentReference)
	}
	if (parameters.showHours !== undefined) {
		await showHours(roomDocumentReference)
	} else if (parameters.hideHours !== undefined) {
		await hideHours(roomDocumentReference)
	} else if (parameters.toggleHours !== undefined) {
		await toggleShowHours(roomState, roomDocumentReference)
	}
	if (parameters.set !== undefined) {
	} else if (parameters.adjust !== undefined) {
	}
	response
		.status(200)
		.json({ status: 'ok', message: 'Request fulfilled successfully.' })
}
