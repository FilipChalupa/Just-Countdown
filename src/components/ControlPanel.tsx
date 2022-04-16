import AddIcon from '@mui/icons-material/Add'
import AlarmIcon from '@mui/icons-material/Alarm'
import AlarmOffIcon from '@mui/icons-material/AlarmOff'
import CloseIcon from '@mui/icons-material/Close'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RemoveIcon from '@mui/icons-material/Remove'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Link,
	Paper,
	Slide,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { Link as RouterLink } from 'react-router-dom'
import { getServerTime } from '../utils/date'
import { db } from '../utils/db'
import { useRoomState } from '../utils/useRoomState'
import { Countdown } from './Countdown'

interface ControlPanelProps {
	id: string
}

export const ControlPanel: React.FunctionComponent<ControlPanelProps> = (
	props,
) => {
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

	const screenUrl = React.useMemo(() => {
		const path = `/screen/?id=${encodeURIComponent(id)}`
		return {
			short: path,
			full: `${window.location.origin}${path}`,
		}
	}, [])

	const setPresets = React.useMemo(
		() => [1, 2, 3, 4, 5, 10, 15, 20, 30, 45, 60, 0],
		[],
	)

	const adjustPresets = React.useMemo(() => [1, 5, 10, 15, 30, 60], [])

	const isLarge = useMediaQuery('(min-width:600px)')

	const { ref, inView: isMainCountdownInView } = useInView()

	return (
		<Box paddingTop={4} paddingBottom={4}>
			<Container>
				<Card elevation={4}>
					<CardHeader
						sx={{ paddingBottom: 0 }}
						action={
							<Tooltip title="Return to frontpage">
								<IconButton component={RouterLink} to="/">
									<CloseIcon />
								</IconButton>
							</Tooltip>
						}
						title={`ID: ${id}`}
						subheader={
							<Link color="inherit" href={screenUrl.full}>
								{isLarge ? screenUrl.full : screenUrl.short}
							</Link>
						}
					/>
					<CardContent>
						<Box textAlign="center">
							<Typography variant="h2" component="div" ref={ref}>
								<Countdown
									end={roomState.end}
									showHours={roomState.showHours}
									paused={roomState.paused}
								/>
							</Typography>
							<Box>
								<Tooltip title="Remove on minute">
									<IconButton onClick={subtractCountdown(1 * 60)}>
										<RemoveIcon />
									</IconButton>
								</Tooltip>
								{roomState.paused ? (
									<Tooltip title="Start countdown">
										<IconButton onClick={togglePaused}>
											<PlayArrowIcon sx={{ height: 38, width: 38 }} />
										</IconButton>
									</Tooltip>
								) : (
									<Tooltip title="Pause countdown">
										<IconButton onClick={togglePaused}>
											<PauseIcon sx={{ height: 38, width: 38 }} />
										</IconButton>
									</Tooltip>
								)}
								<Tooltip title="Add one minute">
									<IconButton onClick={addCountdown(1 * 60)}>
										<AddIcon />
									</IconButton>
								</Tooltip>
							</Box>
						</Box>
					</CardContent>
				</Card>
				<Box paddingBottom={4} />
				<Grid container spacing={2}>
					{setPresets.map((preset) => (
						<Grid item key={preset} xs={6} sm={4} md={3} lg={2}>
							<Button
								onClick={setCountdown(preset * 60)}
								variant="contained"
								color="primary"
								fullWidth
								size="large"
							>
								{preset}{' '}
								{isLarge ? (preset === 1 ? 'minute' : 'minutes') : 'min'}
							</Button>
						</Grid>
					))}
				</Grid>
				<Box paddingBottom={4} />
				<Grid container spacing={2}>
					{adjustPresets.map((preset) => (
						<React.Fragment key={preset}>
							{[-1, 1].map((sign) => (
								<Grid key={sign} item xs={6} md={3} lg={2}>
									<Button
										onClick={
											sign === -1
												? subtractCountdown(preset * 60)
												: addCountdown(preset * 60)
										}
										variant="outlined"
										color={sign === -1 ? 'error' : 'success'}
										fullWidth
										size="large"
									>
										{sign === -1 ? '-' : '+'}
										{preset}{' '}
										{isLarge ? (preset === 1 ? 'minute' : 'minutes') : 'min'}
									</Button>
								</Grid>
							))}
						</React.Fragment>
					))}
				</Grid>
				<Box paddingBottom={4} />
				<Grid container spacing={2}>
					<Grid item xs={6} sm={4} md={3} lg={2}>
						<Button
							onClick={toggleShowHours}
							variant="outlined"
							color="primary"
							fullWidth
							size="large"
							endIcon={roomState.showHours ? <AlarmOffIcon /> : <AlarmIcon />}
						>
							{roomState.showHours ? 'Hide hours' : 'Show hours'}
						</Button>
					</Grid>
				</Grid>
			</Container>
			<div className="controlPanel-footer">
				<Slide direction="down" in={!isMainCountdownInView}>
					<Paper elevation={4} square>
						<Container>
							<Countdown
								end={roomState.end}
								showHours={roomState.showHours}
								paused={roomState.paused}
							/>
						</Container>
					</Paper>
				</Slide>
			</div>
		</Box>
	)
}
