import * as React from 'react'
import { db } from '../utils/db'

interface ControlPanelProps {
	id: string
}

export const ControlPanel: React.SFC<ControlPanelProps> = (props) => {
	const { id } = props

	React.useEffect(() => {
		return db
			.collection('rooms')
			.doc(id)
			.onSnapshot(function (doc) {
				console.log('Current data: ', doc.data())
			})
	}, [id])

	return <div>ControlPanel {id}</div>
}
