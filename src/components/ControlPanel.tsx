import * as React from 'react'
import { getServerTime } from '../utils/date'
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
					getServerTime().getTime() +
						roomState.end.getTime() -
						roomState.paused.getTime() +
						(1001 -
							((roomState.end.getTime() - roomState.paused.getTime()) % 1000)),
			  )
			: roomState.end
		const paused = roomState.paused
			? null
			: new Date(getServerTime().getTime() + 1000)
		db.collection('rooms').doc(id).update({
			paused,
			end,
		})
	}, [id, roomState])

	const setCountdown = (seconds: number) => () => {
		db.collection('rooms')
			.doc(id)
			.update({
				end: new Date(getServerTime().getTime() + seconds * 1000),
				paused: getServerTime(),
			})
	}

	const addCountdown = (seconds: number) => () => {
		const start = roomState.paused || getServerTime()
		db.collection('rooms')
			.doc(id)
			.update({
				end: new Date(
					Math.max(start.getTime(), roomState.end.getTime()) + seconds * 1000,
				),
			})
	}

	const subtractCountdown = (seconds: number) => () => {
		db.collection('rooms')
			.doc(id)
			.update({
				end: new Date(roomState.end.getTime() - seconds * 1000),
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
				{roomState.showHours ? 'Hide hours' : 'Show hours'}
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
					onClick={setCountdown(2 * 60)}
				>
					Set 2 minutes
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(3 * 60)}
				>
					Set 3 minutes
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
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(45 * 60)}
				>
					Set 45 minutes
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={setCountdown(60 * 60)}
				>
					Set 60 minutes
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={addCountdown(1 * 60)}
				>
					Add minute
				</button>
				<button
					className="controlPanel-preset"
					type="button"
					onClick={subtractCountdown(1 * 60)}
				>
					Subtract minute
				</button>
			</div>
		</div>
	)
}
