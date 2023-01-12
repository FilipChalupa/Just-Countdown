import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { registerServiceWorker } from '../utilities/registerServiceWorker'

registerServiceWorker()

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
