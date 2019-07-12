const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');  // used for packaging css into bundles
const chartiqDir = path.join(__dirname, 'chartiq')
const examplesDir = path.join(__dirname, 'chartiq', 'examples')
const devDir = path.join(__dirname, 'src')

module.exports = (env) => {

	env = env || {production: false};
	var environment = env.production ? 'production' : 'development';
	// Pass --env.production=polyfill to include support for legacy browsers
	var entryFile = (env.production === true) ? 'main.js' : 'polyfill.js';
	var devTool = (environment === 'development') ? 'source-map' : '';

	console.log('env.production: '+env.production);
	console.log('environment: '+environment);
	console.log('entryFile: '+entryFile);
	console.log('devTool: '+devTool);

	return {
		devServer: {
			contentBase: path.join(__dirname),
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
		publicPath: '/dist/',
		host: 'localhost',
		port: 4002,
		},
		// Source map file configuration.
		// https://webpack.js.org/configuration/devtool/#devtool
		devtool: devTool,
		// All the individual library files that need to
		// be created need a base entry point to start.
		// https://webpack.js.org/configuration/entry-context/#entry
		entry: {
			// Even though some of these are single files, their dependency
			// on chartiq.js needs to be resolved and the UMD header generated.
			// Let webpack handle all that boilerplate code for us!
			// advanced: path.join(devDir, 'sample-template-advanced.jsx'),
			// xignite: path.join(chartiqDir, 'examples', 'feeds', 'quoteFeedXignite.js'),
			bundle: path.join(devDir, entryFile),
		},
		performance: {
			maxAssetSize: 1500000,
			maxEntrypointSize: 1500000
		},
		mode: environment,
		module: {
			// Loaders are processors for verifying and transformating
			// files that match the given "test" regex
			// https://webpack.js.org/concepts/loaders/
			rules: [
				{ 
					parser: {
						amd: false,
						requireEnsure: false
					}
				},
				/* CSS bundling rule, using SASS */
				{
					test: /\.(s)?css$/,
					use: [
						{loader: MiniCssExtractPlugin.loader, options: {publicPath: 'css/'}},
						'css-loader',
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
								outputPath: '.',
								publicPath: 'dist/'
							}
						}
					]
				},
				/* Javascript and JSX loading */
				{
					test: /\.(js|jsx)$/,
					exclude: [/node_modules/,/\.spec\.js$/, /translationSample/ ],
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					}
				}
			]
		},

		externals: {
			jquery: 'jQuery',
		},

		output: {
			// The naming scheme for the generated bundles.
			// https://webpack.js.org/configuration/output/#output-filename
			filename: '[name].js',
			// The location the bundles are placed when built with the webpack command.
			// https://webpack.js.org/configuration/output/#output-path
			path: path.join(__dirname, 'dist'),
		},
		optimization: {
			// Let other entries know that chartiq.js is its own entry
			// to prevent it from being re-bundled inside other bundles.
			// https://webpack.js.org/plugins/split-chunks-plugin/
			splitChunks: {
				// name: 'chartiq',
				// chunks: 'all'
				// cacheGroups: {
				// 	vendor: {
				// 		test: /[\\/](react|react-dom)[\\/]/,
				// 		name: 'vendor',
				// 		chunks: 'all'
				// 	},
				// }
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				fileNname: '[name].css',
			}),
			new webpack.ProvidePlugin({
				CIQ: ['chartiq', 'CIQ'],
				$$$: ['chartiq', '$$$'],
				quoteFeedSimulator: [path.join(examplesDir, 'feeds', 'quoteFeedSimulator'),'quoteFeedSimulator']
			})
		],
		resolve: {
			alias: {
				chartiq: path.join(chartiqDir, 'js', 'chartiq'),
				components: path.join(chartiqDir, 'js', 'components'),
				componentUI: path.join(chartiqDir, 'js', 'componentUI'),
				'./componentUI': path.join(chartiqDir, 'js', 'componentUI'),
				addOns: path.join(chartiqDir, 'js', 'addOns')
			},
			extensions: ['.js', '.jsx'],
			modules: [
				'node_modules',
				devDir,
				chartiqDir,
				examplesDir,
				path.join(chartiqDir, 'js')
			]
		}
	}
}
