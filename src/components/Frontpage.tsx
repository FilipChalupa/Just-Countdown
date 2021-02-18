import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/app-icon/favicon.svg'

export const Frontpage: React.FunctionComponent = () => (
	<div className="frontpage">
		<div className="frontpage-in">
			<h1 className="frontpage-title">
				<img src={logo} alt="Logo" />
				Just Countdown
			</h1>
			<h2>Presets</h2>
			<ul>
				<li>
					<Link to="/run/?seconds=60">Countdown 1 minute</Link>
				</li>
				<li>
					<Link to="/run/?seconds=120">Countdown 2 minutes</Link>
				</li>
				<li>
					<Link to="/run/?seconds=300">Countdown 5 minutes</Link>
				</li>
				<li>
					<Link to="/run/?seconds=600">Countdown 10 minutes</Link>
				</li>
				<li>
					<Link to="/run/?seconds=3600">Countdown 60 minutes</Link>
				</li>
				<li>
					<Link to="/run/?seconds=86400&amp;showHours">Countdown 1 day</Link>
				</li>
			</ul>
			<h2>With remote control</h2>
			<ol>
				{[1, 2, 3].map((id) => (
					<li key={id}>
						<Link to={`/screen/?id=${id}`}>Screen</Link> /{' '}
						<Link to={`/control/?id=${id}`}>Control</Link>
					</li>
				))}
			</ol>
			{/* @TODO: More <Link to="/control/">Control</Link> */}
		</div>
	</div>
)
