import { createTheme, useMediaQuery } from '@mui/material'
import purple from '@mui/material/colors/purple'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Control } from './Control'
import { Frontpage } from './Frontpage'
import { Run } from './Run'
import { Screen } from './Screen'

export const App: React.FunctionComponent = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
					primary: purple,
				},
			}),
		[prefersDarkMode],
	)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={Frontpage} />
					<Route exact path="/run/" component={Run} />
					<Route exact path="/screen/" component={Screen} />
					<Route exact path="/control/" component={Control} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}
