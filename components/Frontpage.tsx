import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SettingsIcon from '@mui/icons-material/Settings'
import {
	Box,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import logo from '../public/images/app-icon/favicon.svg'
import { CreateCustomForm } from './CreateCustomForm'

export const Frontpage: React.FunctionComponent = () => {
	const staticPresets = React.useMemo(
		() => [
			{ to: '/run/?seconds=60&flashOnZero', label: 'Countdown 1 minute' },
			{ to: '/run/?seconds=120&flashOnZero', label: 'Countdown 2 minutes' },
			{ to: '/run/?seconds=300&flashOnZero', label: 'Countdown 5 minutes' },
			{ to: '/run/?seconds=600&flashOnZero', label: 'Countdown 10 minutes' },
			{ to: '/run/?seconds=3600&flashOnZero', label: 'Countdown 60 minutes' },
			{
				to: '/run/?seconds=86400&showHours&flashOnZero',
				label: 'Countdown 1 day',
			},
		],
		[],
	)

	const dynamicPresets = React.useMemo(() => ['1', '2', '3'], [])

	return (
		<Box paddingTop={4} paddingBottom={4}>
			<Container maxWidth="xs">
				<Box textAlign="center" paddingBottom={4}>
					<Image src={logo} alt="logo" width="100" height="100" />
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
							<ListItemButton component={Link} href={preset.to}>
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
								<IconButton component={Link} href={`/control/?id=${presetId}`}>
									<SettingsIcon />
								</IconButton>
							}
						>
							<ListItemButton component={Link} href={`/screen/?id=${presetId}`}>
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
				<CreateCustomForm />
			</Container>
		</Box>
	)
}
