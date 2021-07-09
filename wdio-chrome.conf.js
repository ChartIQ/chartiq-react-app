let debug = process.env.DEBUG;
const { config } = require('./stx/tests/e2e-v2/wdio-chrome.conf');
const { wdioConfigReact } = require('./wdio.conf.js')

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

const wdioConfig = {
	...config,
	...wdioConfigReact
};
wdioConfig.mochaOpts.require = "./build-scripts/babel-register.js";
exports.config = wdioConfig;
