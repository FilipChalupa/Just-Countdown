import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { db } from '../../utilities/db'
import {
	adjustCountdown,
	calculateRamainingSeconds,
	cleanRemoteRoomStateData,
	hideHours,
	pause,
	setCountdown,
	showHours,
	start,
	togglePaused,
	toggleShowHours,
} from '../../utilities/roomState'
import { secondsToTimeComponents } from '../../utilities/secondsToTimeComponents'

type Data =
	| {
			status: 'error'
			message: string
	  }
	| {
			status: 'ok'
			roomState: {
				id: string
				showHours: boolean
				flashOnZero: boolean
				end: string
				paused: string | null
				remainingTime: {
					hours: number | null
					minutes: number
					seconds: number
				}
			}
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

	const roomState = await getRoomState()
	const remainingTime = secondsToTimeComponents(
		calculateRamainingSeconds(roomState.end, roomState.paused),
		roomState.showHours,
	)

	response.status(200).json({
		status: 'ok',
		roomState: {
			id: roomState.name,
			showHours: roomState.showHours,
			flashOnZero: roomState.flashOnZero,
			end: roomState.end.toISOString(),
			paused: roomState.paused?.toISOString() ?? null,
			remainingTime,
		},
	})
}
