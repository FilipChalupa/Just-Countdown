import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export const App: React.SFC = () => {
	return (
		<Router>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/screen/">Screen</Link>
				</li>
				<li>
					<Link to="/control/">Control</Link>
				</li>
			</ul>
			<Switch>
				<Route exact path="/">
					Home
				</Route>
				<Route exact path="/screen/">
					Screen
				</Route>
				<Route exact path="/control/">
					Control
				</Route>
			</Switch>
		</Router>
	)
}
