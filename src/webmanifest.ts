export const display = 'standalone'
export const start_url = '/'
export const description = 'Countdown timer with remote control.'
export const background_color = '#ffffff'
export const theme_color = '#000000'
export const categories = ['productivity', 'utilities']

const sizes = [36, 48, 72, 96, 128, 144, 192, 256, 384, 512, 1024, 2048]
export const icons = [
	...sizes.map((size) => ({
		src: `images/app-icon/${size}x${size}.png`,
		sizes: `${size}x${size}`,
		purpose: 'any',
	})),
	...sizes.map((size) => ({
		src: `images/app-icon/${size}x${size}-maskable.png`,
		sizes: `${size}x${size}`,
		purpose: 'maskable',
	})),
]
