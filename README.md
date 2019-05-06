# chartiq-react-app

## Overview

### -- BETA RELEASE	--	

**Requirements:** ChartIQ SDK v7.0.1+ 

This project provides ChartIQ's full feature advanced charting application, written with the React framework. It wraps ChartIQ's native Web Components and is fully interoperable with the advanced chart that comes in the ChartIQ SDK.

- [Using this project](#using-this-project)
	- [Including the ChartIQ SDK](#including-the-chartiq-sdk)
- [Project Structure](#project-structure)
- [Building the project](#building-the-project)
- [Integrating a QuoteFeed](#integrating-a-quotefeed)
- [Customizing the project](#customizing-the-project)
- [Commands](#commands)
- [Notes](#notes)


## Using this project

To use this project you will need to include your specific license files provided by ChartIQ. This will allow you to build the project for your licensed domains. This project expects several files from your license in order to compile correctly. They are:
**IF YOU DO NOT INCLUDE THESE FILES, THE APPLICATION WILL NOT COMPILE**
 - chartiq/js/chartiq.js
 - chartiq/js/componentUI.js
 - chartiq/js/components.js
 - chartiq/examples/feeds/quoteFeedSimulator.js
 - chartiq/examples/feeds/symbolLookupChartIQ.js
 - chartiq/examples/markets/marketDefinitionSamples.js
 - chartiq/examples/markets/marketSymbologySample.js
 - chartiq/examples/translations/translationSample.js


> ### Including the ChartIQ SDK
>
> You are expected to provide a copy of the ChartIQ license to in order to run this repo correctly. To get started, extract your licensed files into the `chartiq/` folder. Webpack will then pick up these files and allow you to use them in this project and everything will compile correctly.

Once done use `npm run build` to transpile the contents into one bundle, located in the `/dist` folder, which is used by index.html.

```sh
unzip your-chartiq-license.zip -d ./your-license
cp -r ./your-license ./chartiq
npm run build
cp dist/* ../path/to/your/project
```

- For more about building this project see [Building the project](#building-the-project).
- For more about including the SDK see [Including the ChartIQ SDK](#including-the-chartiq-sdk).

In `src/main.js` you can add React props that are passed down to the chart engine constructor. These props are set in the `chartConstructor` and `preferences` objects. Read more about the arguments that the ChartEngine accepts and the preferences of the chart at [documentation.chartiq.com](http://documentation.chartiq.com)

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

3 directories, 5 files

src
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

2 directories, 3 files
```

## Building the Project

If you wish to use the ChartIQ `<AdvancedChart />` sample in its default state, you may build the component right away and use in your own React project. By default, this project includes polyfills for use in ES5 browsers. To take advantage of them simply run `npm run build` and start using the project.

If you make adjustments to the project and want to test in development mode, use `npm start`. This will run the webpack dev server on port 4002. You may make adjustments or just explore the project. Verify all changes are functioning correctly in development mode before building the production bundle. Run `npm run build` to get your customized bundle.

See [customizing the project](#customizing-the-project) for more details about on custom builds.

## Integrating a quoteFeed

By default the Advanced Chart will fall back to using simulated data from the quoteFeedSimulater (designed for local development) in the ChartIQ SDK. The `<AdvancedChart />` component is designed to take your custom quoteFeed as a React prop. For example, to use the XigniteQuoteFeed, included in the ChartIQ SDK, you would make the following changes to `src/main.js` in your React project: 

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
For more information about building a custom quoteFeed to provide data for your React application, see the [quoteFeed documentation on ChartIQ's developer docs](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html).

## Customizing the Project

`<AdvancedChart />` is designed as a full feature drop in charting component. However, you may not require every feature in this project. If you wish to omit certian feature components, or change the default appearance, you are free to make adjustments to the files in `src/components/` and `src/containers`. If you chose to customize the appearance of this project, **it is strongly recommended that you run the project in development mode and verify all changes are functioning correctly before building.**

Certain feature components, such as menus, have accompanying dialog components. When removing a feature component, it is best to remove all accompanying components. Though leaving unused components in the project will have no adverse impact on the user experience, removing them will keep your final build size as small as possible. For example, if you choose to remove the `<MenuViews />` component from the `<ChartMenus />` component, also be sure to remove the `<DialogView />` component from `<ChartDialogs />`.

Severl of the files necessary to build the project are sample files that you can replace. If you wish to use your own files for market definitions, translations, or quoteFeeds, remember to remove the references to the these files when you import your own. If you only remove the files you will break the project when you try to compile.

## Commands - `npm scripts`

This repo contains some basic scripts to get started quickly, you can see a full list of scripts with `npm run`. They include:
```
npm run build  # outputs the code bundled by webpack
npm run start  # starts the webpack dev server
```

## Notes

When you are working this file there a few things to be aware of. If you need to bind webpack dev server to a differnt host like `http://0.0.0.0`, you will need to include that domain on your license. If you need this for development, please contact your Account Manager to set to have it added to your license.