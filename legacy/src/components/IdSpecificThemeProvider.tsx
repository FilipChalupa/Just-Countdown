import amber from '@mui/material/colors/amber'
import blue from '@mui/material/colors/blue'
import blueGrey from '@mui/material/colors/blueGrey'
import brown from '@mui/material/colors/brown'
import cyan from '@mui/material/colors/cyan'
import deepPurple from '@mui/material/colors/deepPurple'
import green from '@mui/material/colors/green'
import indigo from '@mui/material/colors/indigo'
import lightBlue from '@mui/material/colors/lightBlue'
import lightGreen from '@mui/material/colors/lightGreen'
import lime from '@mui/material/colors/lime'
import orange from '@mui/material/colors/orange'
import pink from '@mui/material/colors/pink'
import purple from '@mui/material/colors/purple'
import teal from '@mui/material/colors/teal'
import yellow from '@mui/material/colors/yellow'
import { ThemeProvider } from '@mui/material/styles'
import type { FunctionComponent } from 'react'
import * as React from 'react'
import { useTheme } from '../utilities/useTheme'

const colors = [
	//red,
	pink,
	purple,
	deepPurple,
	indigo,
	blue,
	lightBlue,
	cyan,
	teal,
	green,
	lightGreen,
	lime,
	yellow,
	amber,
	orange,
	//deepOrange,
	brown,
	//grey,
	blueGrey,
]

// Very naive but good enough
const getIdNumberHash = (id: string) => {
	let output = 0
	for (let i = 0; i < id.length; i++) {
		output += id[i].charCodeAt(0)
	}
	return output
}

export const IdSpecificThemeProvider: FunctionComponent<{
	id: string
}> = ({ id, children }) => {
	const colorIndex = React.useMemo(
		() => Math.abs(getIdNumberHash(id)) % colors.length,
		[id],
	)
	const theme = useTheme(colors[colorIndex])

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
