var path = require('path')
var webpack = require('webpack')
// var srcDir = path.join(__dirname, 'chartiq', 'js')
// var quoteFeedDir = path.join(__dirname, 'chartiq', 'example-feeds')
var devDir = path.join(__dirname, 'src')
var env = process.env.PROD ? "production" : "development"


module.exports = {
	devServer: {
		contentBase: path.join(__dirname,'htdocs','dev'),
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		publicPath: 'localhost:4002/dist',
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
				exclude: [/node_modules/,/\.spec\.js$/ ],
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
		// chartiq: 'chartiq'
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
			quoteFeedSimulator: [path.join('chartiq', 'js', 'quoteFeedSimulator'),'quoteFeedSimulator']
		})
	],
	resolve: {
		alias: {
			chartiq: path.resolve(__dirname, '@chartiq', 'chartiq'),
			components: path.join(__dirname, '@chartiq', 'chartiq', 'js', 'components')
		},
		extensions: ['.js', '.jsx'],
		modules: [
			'node_modules',
			// srcDir,
			devDir,
			// quoteFeedDir,
			path.join(__dirname, '@chartiq', 'chartiq', 'dist','js'),
		]
	}
}
