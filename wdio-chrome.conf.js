const { config } = require('./stx/tests/e2e-v2/wdio-chrome.conf');
const { wdioConfigReact } = require('./wdio.conf.js')

const wdioConfig = {
	...config,
	...wdioConfigReact
};

console.log(`downloadDir from base react config: ${wdioConfigReact.downloadDir}`);
console.log(`check global.downloadDir ${global.downloadDir}`)
const browserPrefs = {
		// prefs: {
			directory_upgrade: true,
			prompt_for_download: false,
			"download.default_directory": global.downloadDir
		// }
};

wdioConfig.capabilities[0]["goog:chromeOptions"]["prefs"] = browserPrefs;
console.log(`Check browser capabilities: `)
console.log(wdioConfig.capabilities[0]);
wdioConfig.mochaOpts.require = "./build-scripts/babel-register.js";
exports.config = wdioConfig;
