import { Box, CircularProgress, Container, Typography } from '@mui/material'
import * as React from 'react'
import { useChromecastReceiverId } from '../useChromecastReceiverId'

export const Cast: React.FunctionComponent = () => {
	const id = useChromecastReceiverId()

	return <>ID: {id}</>

	if (id === null) {
		// @TODO: move styles to CSS
		return (
			<Box
				sx={{
					display: 'grid',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress size={100} />
			</Box>
		)
	}

	return (
		<Box paddingTop={4} paddingBottom={4}>
			<Container maxWidth="xs">
				<Typography variant="h3" component="h1" align="center" gutterBottom>
					Cast Receiver
					<br />
					Just Countdown ngrok {id}
				</Typography>
			</Container>
		</Box>
	)
}
