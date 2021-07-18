const { config } = require('./stx/tests/e2e-v2/wdio-ff.conf');
const { wdioConfigReact } = require('./wdio.conf.js')

const wdioConfig = {
	...config,
	...wdioConfigReact
};
wdioConfig.mochaOpts.require = "./build-scripts/babel-register.js";
exports.config = wdioConfig;
