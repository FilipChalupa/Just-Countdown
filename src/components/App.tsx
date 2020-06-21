import * as React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Control } from './Control'
import { Run } from './Run'

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
							<Link to="/screen/">Screen</Link>
						</li>
						<li>
							<Link to="/control/">Control</Link>
						</li>
					</ul>
				</Route>
				<Route exact path="/run/" component={Run} />
				<Route exact path="/screen/">
					Screen
				</Route>
				<Route exact path="/control/" component={Control} />
			</Switch>
		</Router>
	)
}
