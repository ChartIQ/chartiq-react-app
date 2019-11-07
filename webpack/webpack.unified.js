const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');  // used for packaging css into bundles
const HTMLWebpackPlugin = require('html-webpack-plugin')
const devDir = path.join(__dirname, '..', 'src')


module.exports = {
	devtool: 'source-map',
	// All the individual library files that need to
	// be created need a base entry point to start.
	// https://webpack.js.org/configuration/entry-context/#entry
	entry: {
		bundle: path.join(devDir, 'main.js'),
		advanced: path.join(devDir, 'advanced.js'),
		orderBook: path.join(devDir, 'orderbook.js'),
		marketDepth: path.join(devDir, 'marketdepth.js'),
		cryptoIQWorkStation: path.join(devDir, 'cryptoiq-workstation.js'),
	},
	performance: {
		maxAssetSize: 1500000,
		maxEntrypointSize: 1500000
	},
	// mode: environment,
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Index',
			filename: path.join(__dirname, '..', 'dist', 'index.html'),
			template: path.join(__dirname, '..', 'index.html'),
			chunks: ['bundle']
		}),

		new HTMLWebpackPlugin({
			title: 'AdvancedChart',
			filename: path.join(__dirname, '..', 'dist', 'advanced-chart.html'),
			template: path.join(__dirname, '..', 'index.html'),
			chunks: ['advanced']
		}),

		new HTMLWebpackPlugin({
			title: 'CryptoIQWorkStation',
			filename: path.join(__dirname, '..', 'dist','cryptoIQWorkStation.html'),
			template: path.join(__dirname, '..', 'index.html'),
			chunks: ['cryptoIQWorkStation']
		}),

		new HTMLWebpackPlugin({
			title: 'MarketDepth',
			filename: path.join(__dirname, '..', 'dist','marketdepth.html'),
			template: path.join(__dirname, '..', 'index.html'),
			chunks: ['marketDepth']
		}),

		new HTMLWebpackPlugin({
			title: 'OrderBook',
			filename: path.join(__dirname, '..', 'dist','orderbook.html'),
			template: path.join(__dirname, '..', 'index.html'),
			chunks: ['orderBook']
		}),

		new MiniCssExtractPlugin({
			fileNname: '[name].css',
		}),
	],
}
// }
