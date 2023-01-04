import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import './index.css'
import { registerServiceWorker } from './utils/registerServiceWorker'

registerServiceWorker()

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)
