# chartiq-react-app automated tests

Note: This ./tests folder should not be copied to the public repo!

chartiq-react-app and stx should have the same parent folder!

From chartiq-react-app-private/ :

```sh
npm install
```
From chartiq-react-app-private/tests/ :

```sh
npm install
npm run build:stx-symlink "Used for local testing only. CI clones the stx repo instead."
```
From chartiq-react-app-private/tests/stx :

```sh
npm install
```
From chartiq-react-app-private/tests/ :

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
- In GH Actions, the stx repo is cloned to react-app/tests/stx/ .
- Testing npm scripts are in react-app/tests/package.json .
- More testing dependencies are in react-app/tests/node_modules/@chartiq/ui-tests/package.json .
- npm build:test builds the chart-ui-test package from stx and installs into react-app/tests/.
    - The automated tests use the following resources from the stx project installed into node_modules with chartiq-ui-tests-*.tgz . They are symlinked by tests/webserver-symlinks.js:
      - ./node_modules/@chartiq/ui-tests/test-lib
      - ./node_modules/@chartiq/ui-tests/test-lib/test-rigs-automated
    - Node dependencies from the installation of chartiq-ui-test originate from react-app/tests/stx/tests/package.json . Any changes in this file will need build:test re-run to apply.
- WDIO configs are merged from:
    - react-app/tests/wdio-chrome.conf.js or react-app/tests/wdio-ff.conf.js
    - react-app/tests/stx/tests/e2e-v2/wdio-chrome.conf.js or react-app/tests/stx/tests/e2e-v2/wdio-ff.conf.js
    - react-app/tests/stx/tests/e2e-v2/wdio.conf.js
- Spec files are located at react-app/tests/stx/tests/e2e-v2/specs/sample-template-advanced/**.spec.js
- The react app is built with files outputting to react-app/dist/ .
    - Symlinks for served test assets are added to react-app/dist/ by tests/webserver-symlinks.js .
- The tests are run against a webserver (static-server) started by WDIO with the root path at react-app/dist/ .
    - Configured in react-app/tests/wdio-chrome.conf.js and react-app/tests/wdio-ff.conf.js .

### run tests:

- `npm run test-chrome` - run all tests in Chrome
- `npm run test-ff` - run all tests in FireFox

- `npm run test-chrome:spec` - run tests from specific spec in Chrome
- `npm run test-ff:spec` - run tests from specific spec in FireFox
    - E.g `npm run test-chrome:spec ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js`

- `npm run test-chrome:debug` - run all tests without headless mode in Chrome
- `npm run test-ff:debug` - run all tests without headless mode in FireFox
    - E.g `npm run test-chrome:debug ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js`

- `npm run test-chrome:debug:spec` - run a single spec file in debug mode in Chrome
- `npm run test-ff:debug:spec` - run a single spec file in debug mode in FireFox
    - E.g `npm run test-chrome:debug:spec ./stx/tests/e2e-v2/specs/hotkeys-adv.spec.js`

- `npm run test-chrome-ci` - run test groups in parallel in Chrome
- `npm run test-ff-ci` - run test groups in parallel in FireFox
    - To see these groups look in react-app/tests/wdio.conf.js .
    - Implemented to reduce the time required for a pipeline(could be used locally).
