import { Box, CircularProgress, Container, Typography } from '@mui/material'
import * as React from 'react'
import { useChromecaseReceiver } from '../utilities/useChromecaseReceiver'

export const Cast: React.FunctionComponent = () => {
	const { cast } = useChromecaseReceiver()

	console.log(cast)

	if (cast === null) {
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
					Just Countdown ngrok
				</Typography>
			</Container>
		</Box>
	)
}
