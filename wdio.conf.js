const debug = process.env.DEBUG

const DEFAULT_BROWSERS = [
    // { maxInstances: 2, browserName: 'chrome', chromeOptions: {'args':['headless'] } },
    { maxInstances: 3, browserName: 'firefox', 'moz:firefoxOptions': {'args': ['-headless' ] } }
    //{ maxInstances: 1, browserName: 'chrome'},
    //{ maxInstances: 1, browserName: 'firefox'}
]

const DEBUG_BROWSERS = [
    // {browserName: 'chrome', maxInstances: 1},
    {browserName: 'firefox', maxInstances: 1}
]

const baseConfig = require('@chartiq/ui-tests').baseSettings
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const devServer = require('webpack-dev-server/lib/Server')

// const compiler = webpack(webpackConfig, (err, stats)=>{
//     if (err || stats.hasErrors()){
//         console.error('Webpack could not build correctly, tests will not run')
//         console.error(err)
//     } else {
//         console.log('webpack build and ready to serve...')
//     }
// })

const config = {
    
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        'node_modules/@chartiq/ui-tests/e2e/sample-template-advanced/*.js'
    //     './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: debug ? DEBUG_BROWSERS : DEFAULT_BROWSERS,
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'error',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './tests/errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost:4040',
    basePath: 'node_modules/@chartiq/ui-tests/',
    templateRoot: {
        'sample-template-advanced': ''
    },
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: ['webpack','webpack-dev-server'],
    // services: ['webpack-dev-server'],
    services: ['selenium-standalone'],
    // staticServerFolders: [
    //     { mount: '/', path: '/' }
    // ],
    // Port to use in the baseUrl
    // staticServerPort: 4567,
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    // webpackConfig: require('./webpack.config.js'),
    // webpackPort: 4002,
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    // reporters: ['dot'],
    reporters: ['spec'],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'assert',
        timeout: 86400000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
            const server = new devServer(webpack(webpackConfig), {logLevel: 'info'});

            server.listen(4040, 'localhost', () => {
              console.log('Starting server on http://localhost:4040');
            });
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    beforeCommand: function (commandName, args) {
    },
    
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    // afterTest: function (test) {
    // },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onComplete: function(exitCode, config, capabilities) {
        // this.compiler.close(() => {
        //   console.log('Webpack watching ended.');
        // });
    },
    seleniumArgs: {
        // The selenium-standalone module specifies it's default selenium-server and browser driver versions in the default-config.js file,
        // https://github.com/vvo/selenium-standalone/blob/HEAD/lib/default-config.js
        baseURL: 'https://selenium-release.storage.googleapis.com',
        version: '3.12.0',
        drivers: {
            // The supported Chrome versions supported by each ChromeDriver version is mentioned in the release notes, http://chromedriver.chromium.org/downloads
            chrome: {
                version: '2.41',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            // Version support matrix for geckodriver vs Firefox, https://firefox-source-docs.mozilla.org/testing/geckodriver/geckodriver/Support.html
            firefox: {
                version: '0.23.0',
                arch: process.arch,
                baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
            },
        }
    },
    seleniumInstallArgs: {
        baseURL: 'https://selenium-release.storage.googleapis.com',
        version: '3.12.0',
        drivers: {
            chrome: {
                version: '2.41',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            firefox: {
                version: '0.23.0',
                arch: process.arch,
                baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
            },
        }
    }
}
console.log('exporting...')
exports.config =  Object.assign(baseConfig, config)