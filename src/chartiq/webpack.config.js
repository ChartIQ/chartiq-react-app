const path = require('path');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin'); // used for packaging css into bundles


module.exports = env => {
	console.log(`checking ENV: ${JSON.stringify(env)}`)
	let environment =env && env.production ? 'production' : 'development'
	return {
		mode: environment,
		devtool: environment !== 'production' ? 'source-maps' : '',
		entry: path.join(__dirname, 'index.js'),
		externals: [
			{
				react: {
					commonjs: "react",
					commonjs2: "react",
					amd: "react",
					root: "React"
					},
				"react-dom": {
					commonjs: "react-dom",
					commonjs2: "react-dom",
					amd: "ReactDOM",
					root: "ReactDOM"
					},
			},
			/^chartiq/
		],
		output: {
			library: "chartiqReactComponents",
			libraryTarget: 'umd',
			path: path.join(__dirname, 'dist')
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
				include: [/src/],
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
			})
		],
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
}