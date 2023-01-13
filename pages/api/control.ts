import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { db } from '../../utilities/db'
import {
	adjustCountdown,
	cleanRemoteRoomStateData,
	hideHours,
	pause,
	setCountdown,
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
	const getRoomState = async () => {
		const roomDocumentSnapshot = await getDoc(roomDocumentReference)
		if (roomDocumentSnapshot.exists() === false) {
			await setDoc(roomDocumentReference, {
				name: parameters.id,
			})
		}
		return cleanRemoteRoomStateData(roomDocumentSnapshot.data())
	}
	if (parameters.set !== undefined) {
		await setCountdown(roomDocumentReference, parseInt(parameters.set, 10) || 0)
	} else if (parameters.adjust !== undefined) {
		await adjustCountdown(
			await getRoomState(),
			roomDocumentReference,
			parseInt(parameters.adjust, 10) || 0,
		)
	}
	if (parameters.start !== undefined) {
		await start(await getRoomState(), roomDocumentReference)
	} else if (parameters.pause !== undefined) {
		await pause(await getRoomState(), roomDocumentReference)
	} else if (parameters.togglePaused !== undefined) {
		await togglePaused(await getRoomState(), roomDocumentReference)
	}
	if (parameters.showHours !== undefined) {
		await showHours(roomDocumentReference)
	} else if (parameters.hideHours !== undefined) {
		await hideHours(roomDocumentReference)
	} else if (parameters.toggleHours !== undefined) {
		await toggleShowHours(await getRoomState(), roomDocumentReference)
	}
	response
		.status(200)
		.json({ status: 'ok', message: 'Request fulfilled successfully.' })
}
