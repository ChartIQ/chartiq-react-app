# chartiq-react-app automated tests

Note: This build-scripts/ folder should not be copied to the public repo!

Assumption: This react-app project and the stx project have the same parent folder.

From stx/ :

```sh
npm install
```

From chartiq-react-app-private/ :

```sh
npm install
npm run build:test-new
npm run build:test
npm run build:chartiq
npm run ciq-prep-app

npm run test-chrome
npm run test-ff
```