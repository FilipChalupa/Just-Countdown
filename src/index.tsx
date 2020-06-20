import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import { App } from './components/App'

const app = document.createElement('div')
document.querySelector('body').appendChild(app)
ReactDOM.render(<App />, app)
