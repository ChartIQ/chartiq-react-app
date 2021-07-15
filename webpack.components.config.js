const path = require('path');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin'); // used for packaging css into bundles
const webpack = require('webpack');


module.exports = env => {
	let environment = env.production ? 'production' : 'development'
	return {
		mode: environment,
		devtool: environment !== 'production' ? 'source-maps' : null,
		entry: path.join(__dirname, 'src', 'chartiq', 'index.js'),
		externals: {
			react: {
				commonjs: "react",
				commonjs2: "react",
				amd: "React",
				root: "React"
				},
			"react-dom": {
				commonjs: "react-dom",
				commonjs2: "react-dom",
				amd: "ReactDOM",
				root: "ReactDOM"
				},
			'CIQ': 'chartiq/js/chartiq'

		},
		output: {
			library: "chartiqReactComponents",
			libraryTarget: 'umd',
			path: path.join(__dirname, 'src', 'chartiq', 'dist')
		},
		module: {
			// Loaders are processors for verifying and transformating
			// files that match the given "test" regex
			// https://webpack.js.org/concepts/loaders/
			rules: [
			/* CSS bundling rule, using SASS */
			{
				test: /\.(s)?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: 'css/' }
					},
					'css-loader',
					'sass-loader'
				]
			},
			/* image bundling rule, images are referenced via css */
			{
				test: /\.(jpg|gif|png|svg|cur)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './css/img/',
							publicPath: 'css/img/'
						}
					}
				]
			},
			/* Javascript and JSX loading */
			{
				test: /\.(js|jsx)$/,
				include: [/src/, /node_modules/],
				exclude: [/translationSample/],
				// exclude: [/node_modules/,/\.spec\.js$/, /translationSample/, /webcomponent-containers/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				fileNname: '[name].css'
			}),
			new webpack.ProvidePlugin({
				chartiq: /chartiq/,
				React: 'react'
			})
		],
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
}