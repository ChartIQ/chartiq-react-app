let debug = process.env.DEBUG;
const { config } = require('./stx/tests/e2e-v2/wdio-ff.conf');
const { wdioConfigReact } = require('./wdio.conf.js')

const browsers = [
	{
		maxInstances: debug ? 1 : 5,
		browserName: 'firefox',
		'moz:firefoxOptions': {
			args: debug ? [] : ['-headless'],
			prefs: {
				directory_upgrade: true,
				prompt_for_download: false,
				"browser.helperApps.neverAsk.saveToDisk": "text/csv",
				"browser.download.folderList": 2,
				"browser.download.dir": global.downloadDir
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
