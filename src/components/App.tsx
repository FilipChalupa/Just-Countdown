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
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/run/">Run</Link>
						</li>
						<li>
							<Link to="/screen/?id=1">Screen</Link>
						</li>
						<li>
							<Link to="/control/">Control</Link>
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
