import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SettingsIcon from '@mui/icons-material/Settings'
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import logo from '../images/app-icon/favicon.svg'

export const Frontpage: React.FunctionComponent = () => {
	const history = useHistory()
	const [customId, setCustomId] = React.useState(() =>
		Math.random().toString(36).slice(2, 10),
	)

	const staticPresets = React.useMemo(
		() => [
			{ to: '/run/?seconds=60', label: 'Countdown 1 minute' },
			{ to: '/run/?seconds=120', label: 'Countdown 2 minutes' },
			{ to: '/run/?seconds=300', label: 'Countdown 5 minutes' },
			{ to: '/run/?seconds=600', label: 'Countdown 10 minutes' },
			{ to: '/run/?seconds=3600', label: 'Countdown 60 minutes' },
			{ to: '/run/?seconds=86400&showHours', label: 'Countdown 1 day' },
		],
		[],
	)

	const dynamicPresets = React.useMemo(() => ['1', '2', '3'], [])

	return (
		<Box paddingTop={4} paddingBottom={4}>
			<Container maxWidth="xs">
				<Box textAlign="center" paddingBottom={4}>
					<img src={logo} alt="Logo" width="100" height="100" />
					<Typography variant="h3" component="h1" gutterBottom>
						Just Countdown
					</Typography>
					<Typography variant="body1">
						Choose a countdown from presets below or use one with a remote
						control.
					</Typography>
				</Box>
				<Typography variant="h5" component="h2" gutterBottom>
					Presets
				</Typography>
				<List>
					{staticPresets.map((preset) => (
						<ListItem key={preset.to} disablePadding>
							<ListItemButton component={RouterLink} to={preset.to}>
								<ListItemIcon>
									<AccessTimeIcon />
								</ListItemIcon>
								<ListItemText primary={preset.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Box paddingBottom={1} />
				<Typography variant="h5" component="h2" gutterBottom>
					With remote control
				</Typography>
				<List>
					{dynamicPresets.map((presetId) => (
						<ListItem
							key={presetId}
							disablePadding
							secondaryAction={
								<IconButton
									component={RouterLink}
									to={`/control/?id=${presetId}`}
								>
									<SettingsIcon />
								</IconButton>
							}
						>
							<ListItemButton
								component={RouterLink}
								to={`/screen/?id=${presetId}`}
							>
								<ListItemIcon>
									<AccessTimeIcon />
								</ListItemIcon>
								<ListItemText primary={`Show countdown ${presetId}`} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Box paddingBottom={1} />
				<Typography variant="h5" component="h2" gutterBottom>
					Create custom controlled
				</Typography>
				<form
					onSubmit={(event) => {
						event.preventDefault()
						history.push(`/control/?id=${encodeURIComponent(customId)}`)
					}}
				>
					<Box paddingBottom={0.5} />
					<Grid container alignItems="center" spacing={1}>
						<Grid item xs={8}>
							<TextField
								fullWidth
								size="small"
								label="Choose your id"
								variant="outlined"
								required
								value={customId}
								onChange={(event) => setCustomId(event.target.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<Button
								variant="contained"
								type="submit"
								size="large"
								fullWidth
								endIcon={<SettingsIcon />}
							>
								Open
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</Box>
	)
}
