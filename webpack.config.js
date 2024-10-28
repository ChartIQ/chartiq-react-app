const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CssPlugin = require("mini-css-extract-plugin"); // used for packaging css into bundles
const TerserPlugin = require("terser-webpack-plugin"); // used to control what comments get removed

const fs = require('fs');

module.exports = env => {
    const output = {
        mode: env.production ? "production" : "development",
        devtool: env.production ? undefined : "source-map",
        entry: {
            main: path.join(__dirname, 'src', 'main.js')
        },
        output: {
            chunkFilename: 'js/[name].chunk.js',
            filename: "js/bundle.js"
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
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
                    /**
                     * Tests any file in the bundle for .scss or .css extension using the scss-loader or secondarily the css-loader
                     * Use it for loading any styles in the dependency graph of your bundle.
                     * By default it will load SASS files and bundle them and check for CSS files.
                     * The options object sets a public path where you can find the output.
                     * Read more about css-loader:
                     * https://webpack.js.org/loaders/css-loader/
                     */
                    test: /\.(s)?css$/,
                    type: "javascript/auto",
                    use: [
                        {
                            loader: CssPlugin.loader,
                            options: { esModule: false, publicPath: "css/" }
                        },
                        'css-loader'
                    ]
                },
                {
                    /**
                     * Tests any file for woff or woff2 extension (fonts).
                     * This loader allows you to include these file types within your bundle.
                     * It is used for packaging imported fonts in stylesheets when referenced with url() in setting a CSS property value (both CSS and SCSS).
                     * Read more: https://webpack.js.org/guides/asset-modules
                     */
                    test: /\.(woff2?)$/,
                    type: "asset/inline"
                },
                {
                    /**
                     * Tests any file for a variety of different image file extensions.
                     * This loader will create files for the images; they will not be in the bundle.
                     * It is used for packaging imported images and images in stylesheets when referenced with url() in setting a CSS property value.
                     * The options object sets a public path where you can find the output.
                     * Read more: https://webpack.js.org/guides/asset-modules/
                     */
                    test: /\.(jpg|gif|png|svg|cur)$/,
                    resource: /(?![\\/]images[\\/])/,
                    type: "asset/resource",
                    generator: {
                        filename: "css/img/[name][ext]",
                        publicPath: "../"
                    }
                },
                {
                    /**
                     * Tests any file for a variety of different image file extensions.
                     * This loader will create files for the images; they will not be in the bundle.
                     * It is used for packaging imported images.
                     * The options object sets a public path where you can find the output.
                     * Read more: https://webpack.js.org/guides/asset-modules/
                     */
                    test: /\.(jpg|gif|png|svg|cur)$/,
                    resource: /[\\/]images[\\/]/,
                    type: "asset/resource",
                    generator: {
                        filename: "img/[name][ext]",
                        publicPath: "./"
                    }
                },
                /* Javascript and JSX loading */
                {
                    test: /\.(js|jsx)$/,
                    include: [/src/],
                    exclude: [/node_modules/, /translationSample/],
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
        optimization: {
        },
        plugins: [
            // ignores not available chartiq resource due to not all licenses having the same number of addOns or plugins
            new webpack.IgnorePlugin({
                checkResource 
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'public' },
                    // copy plugin resources
                    {
                        from: 'node_modules/chartiq/plugins/timespanevent/images',
                        to: 'plugins/timespanevent/images',
                        noErrorOnMissing: true
                    },
                    {
                        from: 'node_modules/chartiq/js/thirdparty',
                        to: 'js/thirdparty'
                    }
                ]
            }),
            /**
             * Extracts all of our CSS and SCSS and emits them into one unified stylesheet output.
             * Read more about the Extract CSS Chunks Plugin:
             * https://webpack.js.org/plugins/mini-css-extract-plugin/
             */
            new CssPlugin({
                experimentalUseImportModule: false,
                filename: "./css/chartiq-[name].css"
            }),
            /**
             * Generates an HTML file for your bundle and inserts the output files into it with script tags.
             * By using the HTML Plugin you can create a fresh copy of your HTML page on each build,
             * this allows you to serve the entire output of /dist/ instead of needing to reference files from /dist/ in your index.html
             * Read more about the HTML Plugin:
             * https://webpack.js.org/plugins/html-webpack-plugin/
             */
            new HTMLWebpackPlugin({
                title: 'AdvancedChart',
                filename: path.join("./", 'index.html'),
                template: path.join(__dirname, 'index.html'),
            })
        ],
        resolve: {
            alias: {
                '@chartiq/react-components': path.resolve(__dirname, 'react-components', 'src'),
            },
            extensions: ['.js', '.jsx']
        }
    };

    if (env.production) {
        /**
         * Minimizer allows us to define minification parameters.
         * The TerserPlugin configuration makes sure license comments remain in the bundle.
         * The CssMinimizerPlugin minifies the css output.
         */
        output.optimization.minimizer = [
            env.production
            ? new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: /(^\**!)|@preserve|@license|@cc_on/i
                    }
                },
                extractComments: false
            })
            : undefined
        ]
    }

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
