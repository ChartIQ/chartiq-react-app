var path = require('path')
var webpack = require('webpack')
var chartiqDir = path.join(__dirname, 'chartiq')
var examplesDir = path.join(__dirname, 'chartiq', 'examples')
var devDir = path.join(__dirname, 'src')
var env = process.env.PROD ? "production" : "development"


module.exports = {
	devServer: {
		contentBase: path.join(__dirname),
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		publicPath: 'localhost:4002/dist',
		host: '0.0.0.0',
		port: 4002,
	},
	// Source map file configuration.
	// https://webpack.js.org/configuration/devtool/#devtool
	devtool: 'source-map',
	// All the individual library files that need to
	// be created need a base entry point to start.
	// https://webpack.js.org/configuration/entry-context/#entry
	entry: {
		// Even though some of these are single files, their dependency
		// on chartiq.js needs to be resolved and the UMD header generated.
		// Let webpack handle all that boilerplate code for us!
		basic: path.join(devDir, 'basic-chart.index.js'),
		advanced: path.join(devDir, 'advanced-chart.index.js'),
		// chartiq: './chartiq.entry.js',
	},
	mode: env,
	module: {
		// Loaders are processors for verifying and transformating
		// files that match the given "test" regex
		// https://webpack.js.org/concepts/loaders/
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/,/\.spec\.js$/, /translationSample/ ],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react'],
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
		// splitChunks: {
		// 	name: 'chartiq',
		// 	chunks: 'all'
		// }
	},
	plugins: [
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
