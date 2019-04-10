# stx-ui-react

## Overview

This repo contains an React component library that acts as a wrapper around ChartIQ's native Web Components. This project provides a simple way to encapsulate pre-made custom elements and use them interoperably within a larger React project. 

This project aims to be create a full featured UI that is functionally equivelant to the native web components that come with `sample-template-advanced.html` in your ChartIQ license.

## Getting Started

To run this project copy over your files from the ChartIQ SDK into the `/chartiq` folder overwriting what is already there. Once you have the files you can start the webpack-dev-server with `npm start` and navigate to localhost:4002/
```sh
unzip your-chartiq-license.zip -d ./your-license
cp -r ./your-license ./chartiq
npm start
```

For more about including the SDK see [Including the ChartIQ SDK](#including-the-chartiq-sdk).

## Project Structure

This project adheres to the following structure:

```
.
├── chartiq-chartiq-6.3.0.tgz 		# packaged version of the ChartIQ charting library. Created with `npm pack`
├── dist 							# output folder
├── node_modules					# contains npm modules used in this project
├── package.json 					# packaging information and node scripts (see below)
├── package-lock.json 				# used for audits
├── README.md 						# you are here
├── sample-template-advanced.html 	# template for using this library to reproduce the full UI implementation
├── sample-template-basic.html 		# template for using this library to reprocue a basic UI implementation
├── src 							# all React components live in this folder
└── webpack.config.js 				# configuration for loading the charting library, and building this project

3 directories, 7 files

```

## Commands - `npm scripts`

This repo contains some basic scripts to get started quickly, you can see a full list of scripts with `npm run`. 

## Including the ChartIQ SDK

You are expected to provide a copy of the ChartIQ SDK to in order to run this repo correctly. Already included are several stub files which will allow the project to compile correctly but will throw an alert and errors in the developer console. To get started you should overwrite these files with the correct versions from your SDK and recompile the project. Webpack will then pick up these files and allow you to use them in this project. 

## Testing

This project should adhere to the same expected UI and is expected to work with the E2E tests that accompany `sample-template-advanced.html`