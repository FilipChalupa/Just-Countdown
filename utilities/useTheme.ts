import { createTheme, PaletteColorOptions, useMediaQuery } from '@mui/material'
import * as React from 'react'

export const useTheme = (color: PaletteColorOptions) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
		defaultMatches: true, // Prevents white flash in dark theme
	})

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
					primary: color,
				},
			}),
		[prefersDarkMode, color],
	)

	return theme
}
