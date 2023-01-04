import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GenerateJsonFromJsPlugin = require('generate-json-from-js-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const APP_NAME = 'Just Countdown'

const htmls = ['/', '/run/', '/screen/', '/control/', '/cast/'].map(
	(path) =>
		new HtmlWebpackPlugin({
			title: APP_NAME,
			scriptLoading: 'defer',
			excludeChunks: ['serviceWorker'],
			filename: `.${path}index.html`,
			template: './src/index.html',
		}),
)

module.exports = (env: any, options: any) => {
	const mode = (options.mode as 'production' | undefined) || 'development'

	return {
		resolve: {
			extensions: ['.js', '.tsx', '.ts'],
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
						},
					],
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
			new webpack.DefinePlugin({
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
}
