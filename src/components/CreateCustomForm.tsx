import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Button, Grid, TextField } from '@mui/material'
import { debounce } from 'debounce'
import type { FunctionComponent } from 'react'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { IdSpecificThemeProvider } from './IdSpecificThemeProvider'

export const CreateCustomForm: FunctionComponent = () => {
	const history = useHistory()
	const [customId, setCustomId] = React.useState(() =>
		Math.random().toString(36).slice(2, 10),
	)
	const [debouncedCustomId, setDebouncedCustomId] = React.useState(
		() => customId,
	)

	const debouncedSetDebouncedCustomId = React.useMemo(
		() => debounce(setDebouncedCustomId, 300),
		[],
	)

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()
				history.push(`/control/?id=${encodeURIComponent(customId)}`)
			}}
		>
			<Box paddingBottom={3} />
			<IdSpecificThemeProvider id={debouncedCustomId}>
				<Grid container alignItems="center" spacing={1}>
					<Grid item xs={8}>
						<TextField
							fullWidth
							size="small"
							label="Choose your id"
							variant="outlined"
							required
							value={customId}
							onChange={(event) => {
								setCustomId(event.target.value)
								debouncedSetDebouncedCustomId(event.target.value)
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<Button
							variant="contained"
							type="submit"
							size="large"
							fullWidth
							endIcon={<SettingsIcon />}
							disabled={customId.length === 0}
						>
							Open
						</Button>
					</Grid>
				</Grid>
			</IdSpecificThemeProvider>
		</form>
	)
}
