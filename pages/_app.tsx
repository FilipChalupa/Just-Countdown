import { purple } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { registerServiceWorker } from '../utilities/registerServiceWorker'
import { useTheme } from '../utilities/useTheme'

registerServiceWorker()

export default function App({ Component, pageProps }: AppProps) {
	const theme = useTheme(purple)

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Just Countdown</title>
				<meta
					name="description"
					content="Countdown timer with remote control."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
