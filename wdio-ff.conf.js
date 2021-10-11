const { config } = require('./stx/tests/e2e-v2/wdio-ff.conf');
const { wdioConfigReact } = require('./wdio.conf.js')

const wdioConfig = {
	...config,
	...wdioConfigReact
};

console.log(`downloadDir from base react config: ${wdioConfigReact.downloadDir}`);
console.log(`check global.downloadDir ${global.downloadDir}`)
const browserPrefs = {
	directory_upgrade: true,
	prompt_for_download: false,
	"browser.helperApps.neverAsk.saveToDisk": "text/csv",
	"browser.download.folderList": 2,
	"browser.download.dir": global.downloadDir
};

wdioConfig.capabilities[0]["moz:firefoxOptions"]["prefs"] = browserPrefs;
console.log(`Check browser capabilities: `)
console.log(wdioConfig.capabilities[0]);
wdioConfig.mochaOpts.require = "./build-scripts/babel-register.js";
exports.config = wdioConfig;
