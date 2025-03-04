import path from "node:path";
import fs from "node:fs";
import url from "node:url";
import webpack from "webpack";

import CssPlugin from "mini-css-extract-plugin"; // used for packaging css into bundles
import HtmlWebpackPlugin from "html-webpack-plugin"; // used to load html
import TerserPlugin from "terser-webpack-plugin"; // used to control what comments get removed

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const npmDir = path.join(dirname, "node_modules", "@chartiq", "core");
const tarDir = path.join(dirname, "node_modules", "chartiq", "js");
const isNpm = fs.existsSync(npmDir);
const isTar = !isNpm && fs.existsSync(tarDir);
const chartiqDir = path.join(isNpm ? npmDir : isTar ? tarDir : dirname, "../");
const coreDir = isNpm ? npmDir : chartiqDir;
const resolvedPaths = [
	path.join(chartiqDir, "technical-analysis"),
	path.join(coreDir),
	path.join(chartiqDir, "component-ui"),
	path.join(chartiqDir, "web-components"),
	path.join(chartiqDir, "active-trader"),
	path.join(chartiqDir, "crossplot"),			 
	path.join(chartiqDir, "gonogo"),
	path.join(chartiqDir, "institutional"),
	path.join(chartiqDir, "scriptiq"),
	path.join(chartiqDir, "trading-central"),
	path.join(chartiqDir, "visual-earnings"),
	path.join(chartiqDir)
];
const keyFileDir = process.env.KEY_FILE_DIR;
if (isNpm && !keyFileDir)
	console.log(
		"Environment variable 'KEY_FILE_DIR' not set; you'll need to override or not use alias 'keyDir' when importing keyfile."
	);

const env = process.env.NODE_ENV || "production";

export default {
    mode: env.production ? "production" : "development",
    devtool: env.production ? undefined : "source-map",
    entry: {
        main: path.join(dirname, 'src', 'main.js')
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
		/**
		 * Minimizer allows us to define minification parameters.
		 * The TerserPlugin configuration makes sure license comments remain in the bundle.
		 * The CssMinimizerPlugin minifies the css output.
		 */
		minimizer: [
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
	},
    plugins: [
        // ignores not available chartiq resource due to not all licenses having the same number of addOns or plugins
        new webpack.IgnorePlugin({
            checkResource 
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
        new HtmlWebpackPlugin({
            title: 'AdvancedChart',
            template: path.join(dirname, 'index.html'),
        })
    ],
    resolve: {
        alias: {
            keyDir: path.resolve(isNpm ? keyFileDir : chartiqDir),
            chartiq: resolvedPaths,
            '@chartiq/react-components': path.resolve(dirname, 'react-components', 'src'),
        },
        extensions: ['.js', '.jsx']
    }
};

function checkResource(resource, context) {
	if (!/^chartiq\//.test(resource)) {
		return false;
	}

	for (let _path of resolvedPaths) {
		const lookIn = path.join(_path, resource.split("/").slice(1).join("/"));
		if (fs.existsSync(lookIn) || fs.existsSync(lookIn + '.js'))
			return false;
	}
	console.warn('ERROR finding ' + resource);
	return true;
}
