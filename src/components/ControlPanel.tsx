import * as React from 'react'
import { db } from '../utils/db'
import { useRoomState } from '../utils/useRoomState'
import { Countdown } from './Countdown'

interface ControlPanelProps {
	id: string
}

export const ControlPanel: React.SFC<ControlPanelProps> = (props) => {
	const { id } = props

	const roomState = useRoomState(id)

	const toggleShowHours = React.useCallback(() => {
		db.collection('rooms').doc(id).update({
			showHours: !roomState.showHours,
		})
	}, [id, roomState])

	const togglePaused = React.useCallback(() => {
		const end = roomState.paused
			? new Date(
					new Date().getTime() +
						roomState.end.getTime() -
						roomState.paused.getTime() +
						(1001 -
							((roomState.end.getTime() - roomState.paused.getTime()) % 1000)),
			  )
			: roomState.end
		const paused = roomState.paused
			? null
			: new Date(new Date().getTime() + 1000)
		db.collection('rooms').doc(id).update({
			paused,
			end,
		})
	}, [id, roomState])

	const setCountdown = (seconds: number) => () => {
		const now = new Date()
		db.collection('rooms')
			.doc(id)
			.update({
				end: new Date(now.getTime() + seconds * 1000),
				paused: now,
			})
	}

	const screenUrl = `${window.location.origin}/screen/?id=${encodeURIComponent(
		id,
	)}`

	return (
		<div className="controlPanel">
			<h1 className="controlPanel-title">{roomState.name}</h1>
			<div className="controlPanel-preview">
				<Countdown
					end={roomState.end}
					showHours={roomState.showHours}
					paused={roomState.paused}
				/>
			</div>
			<a
				className="controlPanel-url"
				type="url"
				href={screenUrl}
				target="_blank"
			>
				{screenUrl}
			</a>
			<button type="button" onClick={toggleShowHours}>
				Show hours
			</button>
			<button type="button" onClick={togglePaused}>
				{roomState.paused ? 'Start' : 'Pause'}
			</button>
			<button type="button" onClick={setCountdown(0)}>
				Clear
			</button>
			<div className="controlPanel-presets">
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(1 * 60)}
				>
					Set 1 minute
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(4 * 60)}
				>
					Set 4 minutes
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(5 * 60)}
				>
					Set 5 minutes
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(10 * 60)}
				>
					Set 10 minutes
				</button>
			</div>
		</div>
	)
}
