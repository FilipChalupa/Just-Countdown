import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Control } from './Control'
import { Frontpage } from './Frontpage'
import { Run } from './Run'
import { Screen } from './Screen'

export const App: React.FunctionComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Frontpage} />
				<Route exact path="/run/" component={Run} />
				<Route exact path="/screen/" component={Screen} />
				<Route exact path="/control/" component={Control} />
			</Switch>
		</Router>
	)
}
