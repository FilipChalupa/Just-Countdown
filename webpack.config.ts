import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
// @ts-ignore
import GenerateJsonFromJsPlugin from 'generate-json-from-js-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import 'webpack-dev-server'

const APP_NAME = 'Just Countdown'

const htmls = ['/', '/run/', '/screen/', '/control/', '/cast/'].map(
	(path) =>
		new HtmlWebpackPlugin({
			title: APP_NAME,
			excludeChunks: ['serviceWorker'],
			filename: `.${path}index.html`,
			template: './src/index.html',
		}),
)

module.exports = (_environment: any, options: any) => {
	const mode = (options.mode as 'production' | undefined) || 'development'

	const configuration: Configuration = {
		resolve: {
			extensions: ['.js', '.tsx', '.ts'],
		},
		devServer: {
			allowedHosts: 'all',
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					loader: 'esbuild-loader',
					options: {
						loader: 'tsx',
					},
				},
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader',
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, // @TODO: don't include images
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/fonts/',
							},
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/',
							},
						},
					],
				},
			],
		},
		entry: {
			main: path.resolve(__dirname, './src/index.tsx'),
			serviceWorker: path.resolve(__dirname, './src/serviceWorker.ts'),
		},
		output: {
			filename: (pathData: any) => {
				if (pathData.chunk.name === 'serviceWorker') {
					return 'serviceWorker.js'
				}
				return 'assets/[name]-[fullhash].js'
			},
			path: path.resolve(__dirname, './dist'),
			publicPath: '/',
		},
		plugins: [
			new CleanWebpackPlugin(),
			new DefinePlugin({
				IS_PRODUCTION: JSON.stringify(mode === 'production'),
				IS_DEVELOPMENT: JSON.stringify(mode === 'development'),
			}),
			...htmls,
			new GenerateJsonFromJsPlugin({
				path: './src/webmanifest.ts',
				filename: 'assets/webmanifest.json',
				data: {
					name: APP_NAME,
					short_name: 'Countdown',
				},
			}),
			new CopyPlugin({
				patterns: [
					{
						from: './**/*',
						to: './assets/images/app-icon/',
						context: 'src/images/app-icon/',
					},
				],
			}),
		],
	}
	return configuration
}
