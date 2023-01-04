import { Box, Container, Typography } from '@mui/material'
import * as React from 'react'

export const Cast: React.FunctionComponent = () => {
	return (
		<Box paddingTop={4} paddingBottom={4}>
			<Container maxWidth="xs">
				<Typography variant="h3" component="h1" align="center" gutterBottom>
					Cast Receiver
					<br />
					Just Countdown
				</Typography>
			</Container>
		</Box>
	)
}
