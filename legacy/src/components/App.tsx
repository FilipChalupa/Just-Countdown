import purple from '@mui/material/colors/purple'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Frontpage } from '../../../components/Frontpage'
import { Cast } from '../chromecast/receiver/components/Cast'
import { useTheme } from '../utilities/useTheme'
import { Control } from './Control'
import { Run } from './Run'
import { Screen } from './Screen'

export const App: React.FunctionComponent = () => {
	const theme = useTheme(purple)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={Frontpage} />
					<Route exact path="/run/" component={Run} />
					<Route exact path="/screen/" component={Screen} />
					<Route exact path="/control/" component={Control} />
					<Route exact path="/cast/" component={Cast} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}
