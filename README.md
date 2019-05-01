# stx-ui-react

## Overview

This project provides ChartIQ's fully featured advanced charting application written with React. It wraps ChartIQ's native Web Components to be fully interoperable with the advanced chart that comes in the ChartIQ SDK.

- [Using this project](#using-this-project)
- [Project Structure](#project-structure)
- [Building the project](#building-the-project)
- [Integrating a QuoteFeed](#integrating-a-quotefeed)
- [Customizing the project](#customizing-the-project)
- [Commands](#commands)
- [Including the ChartIQ SDK](#including-the-chartiq-sdk)


## Using this project

To use this project you will need to include your specific SDK files to build the project for your domains. To get started extract your SDK into the the `/chartiq` folder overwriting the provided stub files. Once you have done use `npm run build` to transpile the contents into one bundle that is used in index.html.

```sh
unzip your-chartiq-license.zip -d ./your-license
cp -r ./your-license ./chartiq
npm build
cp dist/* ../path/to/your/project
```

- For more about building this project see [Building the project](#building-the-project).
- For more about including the SDK see [Including the ChartIQ SDK](#including-the-chartiq-sdk).

In `src/main.js` you can pass in props that get passed down to the chart engine constructor with the props chartConstructor and preferences. Read more about the arguments that the ChartEngine accepts and the preferences of the chart at [documentation.chartiq.com](documentation.chartiq.com)

```js
// src/main.js
let constructor = {}
let preferences = {}

ReactDom.render(
	React.createElement(AdvancedChart, 
		{chartConstructor:constructor, preferences: preferences} 
	), document.querySelector("#app")
)
```

- [ChartEngine constructor](https://documentation.chartiq.com/CIQ.ChartEngine.html#ChartEngine__anchor)
- [ChartEngine preferences](https://documentation.chartiq.com/CIQ.ChartEngine.html#preferences)

## Project Structure

This project adheres to the following structure:

```
.
├── dist                            # output folder
├── node_modules                    # contains npm modules used in this project
├── package.json                    # packaging information and node scripts (see below)
├── package-lock.json               # used for audits
├── README.md                       # you are here
├── index.html                      # template for using this library to reproduce the full UI implementation
├── src                             # all React components live in this folder
└── webpack.config.js               # configuration for loading the charting library, and building this project

3 directories, 7 files

src
├── advanced-chart.index.js         # implementation of sample-template-advanced component
├── basic-chart.index.js            # implementation of sample-template-basic component
├── chartiq-react-components.css    # Base CSS file for this project
├── components                      # contains the all the reusable components
│   ├── Core                        # necessary components for making a chart
│   ├── Dialogs                     # all dialogs associated with chart settings
│   ├── Features                    # individual components with specific functionality
│   ├── Layout                      # presentational components that hold other components
│   ├── Menus                       # all menus that go with the chart
│   └── Toggles                     # reusable toggles for turning on and off settings
├── containers
│   └── AdvancedChart.jsx           # React component version of sample-template-advanced.html file that comes with ChartIQ SDK
├── main.js
└── react-chart-context.js          # React Context used as a store in this project

8 directories, 5 files
```

## Building the Project

If you wish to use all of the defaults of the `<AdvancedChart />` you can build the component and use it right away in your own React project. By default the project will include polyfills for use in ES5 browsers and be transpiled back to ES5. In this case you can simply run `npm run build` and start using the project.

If you plan on making adjustments to the project or want run development mode then use `npm start` to start webpack dev server on port 4002. This will let you make adjustments or just generally see how the project is done. After you have made any changes that you may want and validated that everything works for your use you can then run `npm run build` and get your customized bundle of the project.

See [customizing the project](#customizing-the-project) for more details about on custom builds.

## Integrating a quoteFeed

By default the Advanced Chart will fall back to using simulated data from the quoteFeedSimulater (designed for local development) in the ChartIQ SDK. When using the `<AdvancedChart />` component in another project it is designed to take a quoteFeed as a React prop. If you wanted to use the XigniteQuoteFeed that comes in the ChartIQ SDK in your React project you would do: 

```js
// src/main.js
let constructor = {}
let preferences = {}
let Xignite = new CIQ.QuoteFeed.Xignite(null, {useSuperQuotes:true})

ReactDom.render(
	React.createElement(AdvancedChart, 
		{chartConstructor:constructor, preferences: preferences, quoteFeed: Xignite} 
	), document.querySelector("#app")
)
	
```
For more information about building a custom quoteFeed to provide data for your React application see the [quoteFeed documentation on ChartIQ's developer docs](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html).

## Customizing the Project

While `<AdvancedChart />` is designed as a fully featured drop in charting component, you are not required to use every component in this project. If you wish to change the default appearance or not use certain components you are free to make adjustments to the files in `src/components/`. If you chose to customize the appearance of this project **it is strongly recommended that you run the project in development mode and make sure everything looks the way you want before building.**

Remeber that if you are removing a feature from the menu to remove any related dialogs that may go with that setting. For example if you would like to remove the `<MenuViews />` component from the `<ChartMenus />` component, also be sure to remove the `<DialogView />` component from `<ChartDialogs />`.

## Commands - `npm scripts`

This repo contains some basic scripts to get started quickly, you can see a full list of scripts with `npm run`. They include:
```
npm run build  # outputs the code bundled by webpack
npm run start  # starts the webpack dev server
```

## Including the ChartIQ SDK

You are expected to provide a copy of the ChartIQ SDK to in order to run this repo correctly. Already included are several stub files which will allow the project to compile correctly but will throw an alert and errors in the developer console. To get started you should overwrite these files with the correct versions from your SDK and recompile the project. Webpack will then pick up these files and allow you to use them in this project. 