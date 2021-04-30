let debug = process.env.DEBUG;
let ci = process.env.CI;
const { config } = require('./stx/spec/e2e-new/wdio-chrome.conf');
const AllureReporter = require('@wdio/allure-reporter').default;
const path = require('path');
const fs = require('fs');
const StaticServer = require('static-server');
global.downloadDir = path.join(__dirname, 'stx/spec/e2e-new/tempDownload');

const browsers = [
	{
		maxInstances: debug ? 1 : 5,
		browserName: 'chrome',
		'goog:chromeOptions': {
			args: debug
				? ['--incognito', '--no-sandbox', '--test-type=browser', '--start-maximized', '--window-size=800,600']
				: ['--incognito', '--no-sandbox', '--test-type=browser', '--start-maximized', '--window-size=800,600', '--headless'],
			prefs: {
				directory_upgrade: true,
				prompt_for_download: false,
				'download.default_directory': global.downloadDir,
			},
		},
	},
];

// const DEFAULT_BROWSERS = [CHROME_HEADLESS];
// let browsers = DEFAULT_BROWSERS;

const wdioConfig = {
	...config,
	...{
		appName: 'chartiq-react-app',
		specs: ci ? [
			[
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/periodicity-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/display-chartstyles-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/table-view.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/studies-advanced.spec.js"
			],
			[
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/studies-beta-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/pref-locale-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/view-advanced.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/headsup-adv.spec.js"
			],
			[
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/studies-perf-index-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/markers-menu-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/comparison-component-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/drawing-pallete-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/menu-dropdown-component-adv.spec.js"
			],
			[
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/studies-price-relative-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/symbol-search-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/full-screen-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/message-toaster-adv.spec.js",
				"./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/studies-dialog-adv.spec.js"
			]
		] : ['./stx/spec/e2e-new/test/specs/e2e/sample-template-advanced/**.spec.js'],
		// Because we have different names for our templates across projects, we are accessing them thru configured variables.
		// The template object is a way to set the name of the component's file for this specific repo.
		// NOTE: this is something custom to our configs not a default option of WDIO
		baseUrl: 'http://localhost:4040',
		basePath: './',
		templates: {
			'advancedChart': 'technical-analysis'
		},
		/**
		 * Gets executed once before all workers get launched.
		 * @param {Object} config wdio configuration object
		 * @param {Array.<Object>} capabilities list of capabilities details
		 */
		onPrepare: function (config, capabilities) {
			if (!fs.existsSync(global.downloadDir)) {
				fs.mkdirSync(global.downloadDir);
			} else {
				fs.rmdirSync(global.downloadDir, { recursive: true });
				fs.mkdirSync(global.downloadDir);
			}
			var server = new StaticServer({
				rootPath: './dist/',            // required, the root of the server file tree
				port: 4040,               // required, the port to listen
				// name: 'my-http-server',   // optional, will set "X-Powered-by" HTTP header
				host: 'localhost',       // optional, defaults to any interface
				cors: '*',                // optional, defaults to undefined
				followSymlink: true,      // optional, defaults to a 404 error
				templates: {
					index: './dist/index.html',      // optional, defaults to 'index.html'
					notFound: './dist/index.html'    // optional, defaults to undefined
				}
			});

			server.start(function () {
				console.log('Server listening to', server.port);
			});

			server.on('request', function (req, res) {
				// req.path is the URL resource (file name) from server.rootPath
				// req.elapsedTime returns a string of the request's elapsed time
			});

			server.on('symbolicLink', function (link, file) {
				// link is the source of the reference
				// file is the link reference
				// console.log('File', link, 'is a link to', file);
			});

			server.on('response', function (req, res, err, file, stat) {
				// res.status is the response status sent to the client
				// res.headers are the headers sent
				// err is any error message thrown
				// file the file being served (may be null)
				// stat the stat of the file being served (is null if file is null)

				// NOTE: the response has already been sent at this point
			});
		},
		/**
		 * Hook that gets executed before the suite starts
		 * @param {Object} suite suite details
		 */

		afterTest: async function (test, context, {error, result, duration, passed, retries}) {
			if (error !== undefined) {
				await browser.takeScreenshot();
				const html = browser.getPageSource();
				AllureReporter.addAttachment('browser-console.html', html, 'text/html');

				if (error.hasOwnProperty('response') && error.hasOwnProperty('isAxiosError') && error.isAxiosError) {
					const errorResponse = {
						status: error.response.status,
						statusText: error.response.statusText,
						errors: error.response.data.errors,
					};
					AllureReporter.addAttachment('response.json', errorResponse, 'application/json');
				}
			}
			let logs;
			logs = await browser.getLogs('browser');
			if (Object.keys(logs).length !== 0) {
				AllureReporter.addAttachment('page.html', JSON.stringify(logs), 'text/html');
				console.log('Test logs | ' + context.test.title + ':');
				console.log(logs);
				if (logs[0].level === 'SEVERE') {
					context.test.callback(new Error('Browser console ERROR'));
					throw new Error('Browser console ERROR');
				}
				if (logs[0].level === 'WARNING') {
					context.callback(new Error('Browser console WARNING'));
					throw new Error('Browser console WARNING');
				}
			}
			await browser.reloadSession();
		},
		onComplete: function() {
			fs.rmdirSync(global.downloadDir, { recursive: true });
		}
	},
};
wdioConfig.mochaOpts.require = "./build-scripts/babel-register.js";
exports.config = wdioConfig;
