import * as React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Control } from './Control'
import { Run } from './Run'
import { Screen } from './Screen'

export const App: React.SFC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<ul style={{ fontSize: '3em' }}>
						<li>
							<Link style={{ color: 'inherit' }} to="/run/?seconds=120">
								Run
							</Link>
						</li>
						<li>
							<Link style={{ color: 'inherit' }} to="/screen/?id=1">
								Screen
							</Link>
						</li>
						<li>
							<Link style={{ color: 'inherit' }} to="/control/">
								Control
							</Link>
						</li>
					</ul>
				</Route>
				<Route exact path="/run/" component={Run} />
				<Route exact path="/screen/" component={Screen} />
				<Route exact path="/control/" component={Control} />
			</Switch>
		</Router>
	)
}
