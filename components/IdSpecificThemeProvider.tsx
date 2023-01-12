import {
	amber,
	blue,
	blueGrey,
	brown,
	cyan,
	deepPurple,
	green,
	indigo,
	lightBlue,
	lightGreen,
	lime,
	orange,
	pink,
	purple,
	teal,
	yellow,
} from '@mui/material/colors'
import { ThemeProvider } from '@mui/material/styles'
import { FunctionComponent, ReactNode, useMemo } from 'react'
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
	children: ReactNode
}> = ({ id, children }) => {
	const colorIndex = useMemo(
		() => Math.abs(getIdNumberHash(id)) % colors.length,
		[id],
	)
	const theme = useTheme(colors[colorIndex])

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
