export const display = 'standalone'
export const start_url = '/'
export const description = ''
export const background_color = '#ffffff'
export const theme_color = '#000000'

// @TODO
const sizes = [36, 48, 72, 96, 128, 144, 192, 256, 384, 512, 1024, 2048]
export const icons: any = [
	...sizes.map((size) => ({
		src: `icon/${size}x${size}.png`,
		sizes: `${size}x${size}`,
		purpose: 'any',
	})),
	...sizes.map((size) => ({
		src: `icon/${size}x${size}-maskable.png`,
		sizes: `${size}x${size}`,
		purpose: 'maskable',
	})),
]