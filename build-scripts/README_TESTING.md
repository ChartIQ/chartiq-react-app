# chartiq-react-app automated tests

Note: This build-scripts/ folder should not be copied to the public repo!

chartiq-react-app and stx should have the same parent folder!

From chartiq-react-app-private/ :
```sh
npm install
npm run build:stx-symlink //"Used for local testing only. CI clones the stx repo instead."
```
From chartiq-react-app-private/stx :
```sh
npm install
```
From chartiq-react-app-private/ :
```sh
npm run build:test
npm run build:chartiq
npm run ciq-prep-app

npm run test-chrome
npm run test-ff

npm run report
```

### Testing assets overview:

- Local testing, requires stx project to be symlinked.
- In GH Actions, the stx repo is cloned to stx/ .
- Testing npm scripts are in package.json in react-app root.
- Testing dependencies are in react-app/node_modules/@chartiq/ui-tests/package.json .
- npm build:test builds the chart-ui-test package from stx and installs into react-app.
    - The automated tests use the following resources from the stx project installed into node_modules with chartiq-ui-tests-*.tgz:
        - stx/tests/test-lib/**
        - stx/tests/test-rigs-automated/**
    - Node dependencies from the installation of chartiq-ui-test orignate from stx/tests/package.json . Any changes in this file will need build:test re-run to apply.
- WDIO configs are merged from:
    - react-app/wdio-chrome.conf.js or react-app/wdio-ff.conf.js
    - stx/tests/e2e-v2/wdio.conf.js
- Spec files are located at stx/tests/e2e-v2/specs/sample-template-advanced/**.spec.js
    - defined in react-app/wdio-chrome.conf.js and react-app/wdio-ff.conf.js
- The react app is built with files outputting to dist/ .
- The tests are run against a webserver (static-server) started by WDIO with the root path at dist/ .
    - Configured in react-app/wdio-chrome.conf.js and react-app/wdio-ff.conf.js .

### run tests:

-   `npm run test-chrome` - run all tests in Chrome
-   `npm run test-ff` - run all tests in FireFox

-   `npm run test-chrome:spec` - run tests from specific spec in Chrome
-   `npm run test-ff:spec` - run tests from specific spec in FireFox
	- E.g "npm run test-chrome:spec ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js"

-	`npm run test-chrome:debug` - run all tests without headless mode in Chrome
-	`npm run test-ff:debug` - run all tests without headless mode in FireFox
	 - E.g " npm run test-chrome:debug ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js"

-	`npm run test-chrome:debug:spec` - run a single spec file in debug mode in Chrome
-	`npm run test-ff:debug:spec` - run a single spec file in debug mode in FireFox
	 - E.g " npm run test-chrome:debug:spec ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js"

-	`npm run test-chrome-ci` - run test groups in parallel in Chrome
-	`npm run test-ff-ci` - run test groups in parallel in FireFox
	 - To see these groups go to wdio.conf.js file
	 - Implemented to reduce the time required for a pipeline(could be used locally)
