import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="manifest" href="/app.webmanifest" />
				<link rel="shortcut icon" href="images/app-icon/favicon.svg" />
				<meta property="og:image" content="images/og-image.jpg" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta name="color-scheme" content="light dark" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="white"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#121212"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
