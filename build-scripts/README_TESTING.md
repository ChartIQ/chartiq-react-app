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
These automated tests use the following resources from the stx project installed into node_modules by chartiq-ui-tests-*.tgz:
stx/spec/test-lib/*
stx/spec/test-rigs-automated/*
stx/spec/index.js

The spec files and a partial wdio.conf.js file that are used are copied into the project's normal file structure:
chartiq-angular-app-private/stx/spec/e2e-new
