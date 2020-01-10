const path = require('path');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin'); // used for packaging css into bundles
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, '..', 'dist'),
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		publicPath: '/',
		host: 'localhost',
		port: 4002
	},
	module: {
		// Loaders are processors for verifying and transformating
		// files that match the given "test" regex
		// https://webpack.js.org/concepts/loaders/
		rules: [
			/* HTML bundling rule, used mainly for plugins UI */
			{
				test: /\.html/,
				use: [{ loader: 'html-loader' }]
			},
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
	externals: {
		jquery: 'jQuery'
	},

	plugins: [
		// ignores not available chartiq resource due to not all licenses having
		// the same number of addOns or plugins
		new webpack.IgnorePlugin({
			checkResource 
		}),
		new MiniCssExtractPlugin({
			fileNname: '[name].css'
		}),
		new CopyPlugin([
			{ from: 'public' },
			// copy plugin resources
			{
				from: 'node_modules/chartiq/plugins/timespanevent/images',
				to: 'plugins/timespanevent/images'
			}
		])
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

function checkResource(resource, context) {
	if (!/^chartiq\//.test(resource)) {
		return false;
	}

	if (
		fs.existsSync('./node_modules/' + resource)
		|| fs.existsSync('./node_modules/' + resource + '.js')
	) {
		return false;
	}
	console.warn('ERROR finding ' + resource);
	return true;
}
