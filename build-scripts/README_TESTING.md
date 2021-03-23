# chartiq-react-app automated tests

Note: This build-scripts/ folder should not be copied to the public repo!

From chartiq-react-app-private/ :
```sh
npm install
npm run build:clone-new-tests
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
```