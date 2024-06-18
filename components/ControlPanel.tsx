import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PreviewIcon from '@mui/icons-material/Preview'
import RemoveIcon from '@mui/icons-material/Remove'
import ShareIcon from '@mui/icons-material/Share'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Slide,
	TextField,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { doc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useStorageBackedState } from 'use-storage-backed-state'
import { getLocalTime, getServerTime } from '../utilities/date'
import { db } from '../utilities/db'
import {
	RoomState,
	adjustCountdown,
	setCountdown,
	setTheme,
	themes,
	togglePaused,
	toggleShowHours,
} from '../utilities/roomState'
import { useRoomState } from '../utilities/useRoomState'
import styles from './ControlPanel.module.css'
import { Countdown } from './Countdown'
import { IdSpecificThemeProvider } from './IdSpecificThemeProvider'
import { InvisibleTimeInput } from './InvisibleTimeInput'
import { CastButton } from './chromecast/sender/components/CastButton'
import { useIsChromecastSenderAvailable } from './chromecast/sender/useIsChromecastAvailable'

const messageFormId = 'messageForm'
const customTimeAdjustmentFormId = 'customTimeAdjustmentForm'
const customDateFormId = 'customDateForm'

interface ControlPanelProps {
	id: string
}

const formatToDateInputValue = (date: Date) => {
	const doubleDigits = (number: number) => number.toString().padStart(2, '0')
	return `${date.getFullYear()}-${doubleDigits(
		date.getMonth() + 1,
	)}-${doubleDigits(date.getDate())}T${doubleDigits(
		date.getHours(),
	)}:${doubleDigits(date.getMinutes())}`
}

export const ControlPanel: React.FunctionComponent<ControlPanelProps> = ({
	id,
}) => {
	const roomDocumentReference = React.useMemo(() => doc(db, 'rooms', id), [id])

	const roomState = useRoomState(id)

	const toggleFlashOnZero = React.useCallback(() => {
		updateDoc(roomDocumentReference, {
			flashOnZero: !roomState.flashOnZero,
		})
	}, [roomDocumentReference, roomState.flashOnZero])

	const toggleForceFlash = React.useCallback(() => {
		updateDoc(roomDocumentReference, {
			forceFlash: !roomState.forceFlash,
		})
	}, [roomDocumentReference, roomState.forceFlash])

	const screenUrl = React.useMemo(() => {
		const path = `/screen/?id=${encodeURIComponent(id)}`
		return {
			short: path,
			full: `${window.location.origin}${path}`,
		}
	}, [id])

	const shareUrl = React.useMemo(() => {
		if (!('share' in navigator)) {
			return null
		}
		return screenUrl.full
	}, [screenUrl.full])

	const setPresets = React.useMemo(
		() => [1, 2, 3, 4, 5, 10, 15, 20, 30, 45, 60, 0],
		[],
	)

	const adjustPresets = React.useMemo(
		() => [10, 1 * 60, 3 * 60, 5 * 60, 10 * 60, 15 * 60, 30 * 60, 60 * 60],
		[],
	)

	const isLarge = useMediaQuery('(min-width:600px)')

	const { ref, inView: isMainCountdownInView } = useInView()

	const [message, setMessage] = React.useState('')
	React.useEffect(() => {
		setMessage(roomState.message)
	}, [roomState.message])

	const [customDate, setCustomDate] = React.useState('')

	React.useEffect(() => {
		// @TODO: fix drifting from local time
		const serverTime = getServerTime().getTime()
		const localTime = getLocalTime().getTime()
		const roomEndServerTime = roomState.end.getTime()
		const roomEndLocalTime = new Date(
			localTime + roomEndServerTime - serverTime,
		)
		setCustomDate(formatToDateInputValue(roomEndLocalTime))
	}, [roomState.end])

	const isChromecastAvailable = useIsChromecastSenderAvailable()

	const [customTime, setCustomTime] = React.useState('')

	const [isExperimentalAllowed, setIsExperimentalAllowed] =
		useStorageBackedState(false, 'experimental')

	return (
		<IdSpecificThemeProvider id={id}>
			<form
				id={customDateFormId}
				onSubmit={(event) => {
					event.preventDefault()
					const targetLocalTime = new Date(customDate).getTime()
					const nowLocalTime = getLocalTime().getTime()
					const seconds = Math.max(
						0,
						Math.ceil((targetLocalTime - nowLocalTime) / 1000),
					)
					setCountdown(roomDocumentReference, seconds, false)
				}}
			/>
			<form
				id={messageFormId}
				onSubmit={(event) => {
					event.preventDefault()
					updateDoc(roomDocumentReference, {
						message,
					})
				}}
			/>
			<form
				id={customTimeAdjustmentFormId}
				onSubmit={(event) => {
					event.preventDefault()
					// @TODO
				}}
			/>
			<Box paddingTop={4} paddingBottom={4}>
				<Container>
					<Card elevation={4}>
						<CardHeader
							sx={{ paddingBottom: 0 }}
							action={
								<Tooltip title="Return to frontpage">
									<IconButton component={Link} href="/">
										<CloseIcon />
									</IconButton>
								</Tooltip>
							}
							title={`ID: ${id}`}
							subheader={
								<Button
									variant="text"
									color="inherit"
									startIcon={<PreviewIcon />}
									style={{
										textTransform: 'none',
									}}
									component={Link}
									href={screenUrl.short}
								>
									{isLarge ? screenUrl.full : screenUrl.short}
								</Button>
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
										<IconButton
											onClick={() => {
												adjustCountdown(
													roomState,
													roomDocumentReference,
													-1 * 60,
												)
											}}
										>
											<RemoveIcon />
										</IconButton>
									</Tooltip>
									{roomState.paused ? (
										<Tooltip title="Start countdown">
											<IconButton
												onClick={() => {
													togglePaused(roomState, roomDocumentReference)
												}}
											>
												<PlayArrowIcon sx={{ height: 38, width: 38 }} />
											</IconButton>
										</Tooltip>
									) : (
										<Tooltip title="Pause countdown">
											<IconButton
												onClick={() => {
													togglePaused(roomState, roomDocumentReference)
												}}
											>
												<PauseIcon sx={{ height: 38, width: 38 }} />
											</IconButton>
										</Tooltip>
									)}
									<Tooltip title="Add one minute">
										<IconButton
											onClick={() => {
												adjustCountdown(
													roomState,
													roomDocumentReference,
													1 * 60,
												)
											}}
										>
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
									onClick={() => {
										setCountdown(roomDocumentReference, preset * 60)
									}}
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
											onClick={() => {
												adjustCountdown(
													roomState,
													roomDocumentReference,
													sign * preset,
												)
											}}
											startIcon={sign === -1 ? <RemoveIcon /> : <AddIcon />}
											variant="outlined"
											color={sign === -1 ? 'error' : 'success'}
											fullWidth
											size="large"
										>
											<span className={styles.growContent}>
												{preset >= 60 ? (
													<>
														{preset / 60}{' '}
														{isLarge
															? preset === 1
																? 'minute'
																: 'minutes'
															: 'min'}
													</>
												) : (
													<>
														{preset} {isLarge ? 'seconds' : 'sec'}
													</>
												)}
											</span>
										</Button>
									</Grid>
								))}
							</React.Fragment>
						))}
						<Grid item xs={6} md={3} lg={2}>
							<TextField
								label="Custom adjustment"
								value={customTime}
								inputProps={{
									form: customTimeAdjustmentFormId,
								}}
								onChange={(event) => {
									setCustomTime(event.target.value)
								}}
								size="small"
								fullWidth
								required
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} md={3} lg={2}>
							<div className={styles.multibutton}>
								<Button
									variant="outlined"
									type="submit"
									form={customTimeAdjustmentFormId}
									color="error"
									size="large"
									fullWidth
								>
									<RemoveIcon />
								</Button>
								<Button
									variant="outlined"
									type="submit"
									form={customTimeAdjustmentFormId}
									color="success"
									size="large"
									fullWidth
								>
									<AddIcon />
								</Button>
							</div>
						</Grid>
					</Grid>
					<Box paddingBottom={4} />
					<Grid container spacing={2}>
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={roomState.showHours} />}
									onChange={() => {
										toggleShowHours(roomState, roomDocumentReference)
									}}
									label="Show hours"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={roomState.flashOnZero} />}
									onChange={() => {
										toggleFlashOnZero()
									}}
									label="Flash on 00:00"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={8} md={4} lg={3} alignSelf="center">
							<TextField
								label="Custom date"
								type="datetime-local"
								value={customDate}
								inputProps={{
									form: customDateFormId,
								}}
								onChange={(event) => {
									setCustomDate(event.target.value)
								}}
								size="small"
								fullWidth
								required
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={4} md={2} lg={1} alignSelf="center">
							<Button
								variant="contained"
								type="submit"
								form={customDateFormId}
								size="large"
								fullWidth
								endIcon={<PlayArrowIcon />}
							>
								Set
							</Button>
						</Grid>
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<FormControl fullWidth size="small">
								<InputLabel id="theme-label">Theme</InputLabel>
								<Select
									labelId="theme-label"
									value={roomState.theme}
									label="Age"
									onChange={(event) => {
										setTheme(
											roomDocumentReference,
											event.target.value as RoomState['theme'],
										)
									}}
								>
									{themes.map((theme) => (
										<MenuItem key={theme} value={theme}>
											{theme}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} sm={4} md={3} lg={2}>
							<Button
								variant="contained"
								component={Link}
								href={screenUrl.short}
								size="large"
								fullWidth
								endIcon={<PreviewIcon />}
							>
								Screen
							</Button>
						</Grid>
						{shareUrl && (
							<Grid item xs={6} sm={4} md={3} lg={2}>
								<Button
									variant="contained"
									onClick={() => {
										navigator.share({
											url: shareUrl,
										})
									}}
									size="large"
									fullWidth
									endIcon={<ShareIcon />}
								>
									Share
								</Button>
							</Grid>
						)}
						<Grid item xs={6} sm={4} md={4} lg={4}>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={isExperimentalAllowed} />}
									onChange={() => {
										setIsExperimentalAllowed(!isExperimentalAllowed)
									}}
									label="Allow experimental features"
								/>
							</FormGroup>
						</Grid>
						{isChromecastAvailable && (
							<Grid item xs={6} sm={4} md={3} lg={2}>
								<CastButton id={id} />
							</Grid>
						)}
						{isExperimentalAllowed && (
							<>
								<Grid item xs={12}>
									<div style={{ paddingBlock: '2em' }}>
										<Divider />
									</div>
								</Grid>
								<Grid item xs={6} sm={4} md={3} lg={2}>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox checked={roomState.forceFlash} />}
											onChange={() => {
												toggleForceFlash()
											}}
											label="Force flash"
										/>
									</FormGroup>
								</Grid>
								<Grid item xs={8} md={4} lg={3} alignSelf="center">
									<TextField
										label="Message"
										value={message}
										onChange={(event) => {
											setMessage(event.target.value)
										}}
										inputProps={{ form: messageFormId }}
										size="small"
										fullWidth
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
								<Grid item xs={4} md={2} lg={1} alignSelf="center">
									<Button
										variant="contained"
										type="submit"
										form={messageFormId}
										size="large"
										fullWidth
										endIcon={<PlayArrowIcon />}
									>
										Set
									</Button>
								</Grid>
								<InvisibleTimeInput
									onInput={(seconds) => {
										setCountdown(roomDocumentReference, seconds)
									}}
									onTogglePause={() => {
										togglePaused(roomState, roomDocumentReference)
									}}
								/>
							</>
						)}
					</Grid>
				</Container>
				<div className="controlPanel-footer">
					<Slide direction="down" in={!isMainCountdownInView}>
						<div className="controlPanel-footer-in">
							<Paper elevation={4} square>
								<Container>
									<Countdown
										end={roomState.end}
										showHours={roomState.showHours}
										paused={roomState.paused}
									/>
								</Container>
							</Paper>
						</div>
					</Slide>
				</div>
			</Box>
		</IdSpecificThemeProvider>
	)
}
