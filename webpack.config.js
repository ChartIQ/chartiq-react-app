const path = require('path');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin'); // used for packaging css into bundles
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const fs = require('fs');

module.exports = env => {
    let environment
    let devtool = ''

    console.log("Webpack env: ", env)
    if(env)
        environment = env.production ? 'production' : 'development'
    else
        environment = 'development'

    devtool = environment === 'development' ? 'source-maps' : ''
    
    let output = {
        mode: environment,
        devtool: devtool,
        entry: {
            bundle: path.join(__dirname, 'src', 'main.js')
        },
        output: {
            chunkFilename: '[name].bundle.js'
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            publicPath: '/',
            host: 'localhost',
            port: 4002,
            historyApiFallback: true
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
            ]),
            new HTMLWebpackPlugin({
                title: 'AdvancedChart',
                filename: path.join(__dirname, 'dist', 'index.html'),
                template: path.join(__dirname, 'index.html'),
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        }
    };
    
    console.log('final merged webpack config: ',output)

    return output  
}

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