import { purple } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { registerServiceWorker } from '../utilities/registerServiceWorker'
import { useTheme } from '../utilities/useTheme'

registerServiceWorker()

export default function App({ Component, pageProps }: AppProps) {
	const theme = useTheme(purple)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
