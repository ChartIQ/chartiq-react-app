# chartiq-react-app

**Requirements:** ChartIQ SDK v7.2.0+ 

## Overview

This project is an implementation of ChartIQ's Advanced Chart application written for the React framework. 
It wraps ChartIQ's native [Web Components](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html) and is fully interoperable with the advanced HTML template (*sample-template-advanced.html*) that comes with the ChartIQ SDK.

## Table of contents
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Building the project](#building-the-project)
- [Accessing the Chart Engine](#accessing-the-chart-engine)
- [Integrating a QuoteFeed](#integrating-a-quotefeed)
- [Customizing the project](#customizing-the-project)
- [Commands](#commands)
- [Configuring AddOns](#configuring-addons)
- [Configuring Plugins](#configuring-plugins)
- [Notes](#notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)



## Getting started

To use this project you will need to include a copy of the ChartIQ library. It is recommended that you install the library from the tarball that you recieved in your license. If you do not have a copy of the library, please contact your account manager before continuing this installation.

This project lists the chartiq tarball as an optional dependency from the root of the repo. If you do not keep your tarball here, you will need to specify where it is located and install manually.

```
npm install ./path-to/chartiq-7.2.0.tgz
```

When you are upgrading or changing your license it is recommended that you completely remove the old tarball before reinstalling the new one

```
npm remove chartiq
npm install ./path-to-new/chartiq-7.2.0.tgz
```

- For more about building this project see [Building the project](#building-the-project).

Once you have installed the chartiq package you can begin working with the project. In *src/main.js* you can add React props that are passed down to the chart engine constructor. These props are set in the `chartConstructor` and `preferences` objects. Read more about the arguments that the ChartEngine accepts and the preferences of the chart at [documentation.chartiq.com](http://documentation.chartiq.com)

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
├── chartiq-react-components.css    # base CSS file for this project
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
├── polyfill.js
└── react-chart-context.js          # React Context used as a store in this project

2 directories, 4 files
```

## Building the project

If you wish to use the ChartIQ `<AdvancedChart />` sample in its default state, you may build the component right away and use in your own React project. Simply run the npm script `npm run build` to generate the javascript bundle file, which can be found in the `dist/` folder.

In order to keep the bundle size as small as possible this project does not, by default, support older browsers. You may optionaly include polyfills for legacy browser support by running the npm script `npm run build:polyfill`. This script is identical to `npm run build` but will attach polyfills to the javascript bundle file for legacy browser support.

If you make adjustments to the project and want to test in development mode, use `npm start`. This will run the webpack dev server on port 4002. You may make adjustments or just explore the project. Verify all changes are functioning correctly in development mode before building the production bundle. Run `npm run build` to get your customized bundle.

In addition to the `<AdvancedChart />` you can also build several other components from the CryptoIQ Plugin: OrderBook, MarketDepth, and the CryptoIQWorkStation. You can build all of the components at once with `npm run watch:unified` and find them listed at [localhost:4002/dist/](http://localhost:4002/dist/).

This project makes use of [Webpack Merge](https://github.com/survivejs/webpack-merge) to keep its configurations more managable and allow for individual building of each component. The standard _webpack.config.js_ pulls in configurations for each component from the _webpack/_ folder and merges them together to build the project. By default the project builds the AdvancedChart but you can change the build target by setting the `env.build` variable that you pass into _webpack.config.js_. 

If you would like to build for a specific component we recommend that you add a your own build script to _package.json_. The example below shows how to add a node script to build the MarketDepth component for production. The `env.build` variable has been set to reference the _webpack/webpack.market-depth.js_ in _webpack.config.js_ : 
```json
"build:marketDepth": "webpack --config=webpack.config.js --env.production --env.build=marketDepth"
```

See [customizing the project](#customizing-the-project) for more details about on custom builds.

## Accessing the Chart Engine

You can access the [ChartEngine](https://documentation.chartiq.com/CIQ.ChartEngine.html) and the [UIContext](https://documentation.chartiq.com/CIQ.UI.Context.html) for the application via the React's [Context](https://reactjs.org/docs/context.html). The application gets its context from the  `<AdvancedChart />` state. If you need to access the the chart engine this is the best place to do so. 

In the example below you may want to stream data into the chart engine instead of relying on a quoteFeed. This example gets you started with streaming data.
```js
// in some component with access to React Context
let stx = this.context.stx
stx.quoteDriver.die()
stxx.updateChartData({"Close": 102.05, "Volume": 100, "DT":new Date("20160102T093000Z"}, null, {fillGaps: true, useAsLastSale: true});
```
*Remember if you are creating new components to import "src/react-chart-context.js" and set the contextType*

## Integrating a quoteFeed

By default the Advanced Chart will fall back to using simulated data from the quoteFeedSimulater (designed for local development) in the ChartIQ SDK. The Advanced Chart component is designed to take your custom quoteFeed as a React prop. For example, to use the XigniteQuoteFeed included in the ChartIQ SDK, you would make the following changes to *src/main.js* in your React project: 

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

## Customizing the project

The Advanced Chart compopnent is designed as a full-feature drop-in charting component. However, you may not require every feature in this project. If you wish to omit certain features or change the default appearance, you are free to make adjustments to the files in *src/components/* and *src/containers*. If you chose to customize the appearance of this project, **it is strongly recommended that you run the project in development mode and verify all changes are functioning correctly before building.**

Certain feature components, such as menus, have accompanying dialog components. When removing a feature component, it is best to remove all accompanying components. Though leaving unused components in the project will have no adverse impact on the user experience, removing them will keep your final build size as small as possible. For example, if you choose to remove the `<MenuViews />` component from the `<ChartMenus />` component, also be sure to remove the `<DialogView />` component from `<ChartDialogs />`.

Several of the files necessary to build the project are sample files that you can replace. If you wish to use your own files for market definitions, translations, or quoteFeeds, remember to remove the references to the these files when you import your own. If you only remove the files you will break the project when you try to compile.

Be aware that any customization you do will not be reflected in this project. Future releases are not guarenteed to work with your changes. The project roadmap does include a way to make the project more configurable. 

## Commands 
(`npm scripts`)

This repo contains some basic scripts to help you get started quickly. You can see a full list of scripts with `npm run`. They include:
```
npm run build  # outputs the code bundled by webpack
npm run build:polyfill  # outputs the code bundled by webpack including polyfills for legacy browser support
npm run start  # starts the webpack dev server
```

## Configuring AddOns

AddOns available in the ChartIQ SDK are compatible with this project. The `<AdvancedChart />` component takes an addOns prop that allows for each addOn to be individually configured. The addOns prop is an object where each key corresponds with the addOn from the SDK. By default the project enables three addons: ExtendedHours, InactivityTimer, and RangeSlider. If you would like to change the constructors being passed into the addOns, change the value of that addOns prop. 

```js
//Set the CIQ.InactivityTimer to time out after one hour
let enableAddOns = {InactivityTimer: {minutes:60}, ExtendedHours: {filter:true}, RangeSlider:true}

ReactDom.render(React.createElement(AdvancedChart, {
	addOns={enableAddOns}
}), document.querySelector('#app'))
```

By removing an object from the addOns prop, you will not be initialize that addOn. The following example starts only the RangeSlider and the Tooltip:

```js
let enableAddOns = {RangeSlider:true, Tooltip: {ohl:true, volume:true, series:true, studies:true}}

ReactDom.render(React.createElement(AdvancedChart, {
	addOns={enableAddOns}
}), document.querySelector('#app'))
```

## Configuring Plugins

Similar to the way addOns work, you can configure the plugins from the ChartIQ library with the "plugins" React prop. By default the AdvancedChart uses: CryptoIQ, ScriptIQ, and TradeFromChart (TFC). If you wish to disable a plugin, do not pass in a truth value for that plugin in the plugins prop. See the example below on how to customize the plugins:

```js
import SomeDemoClass from './path/to/demo-class.js'

let enablePlugins = {TFC: {account: SomeDemoClass}, cryptoiq: {
	MarketDepth: {
		volume: true,
		step: true,
		height: 40%,
		precedingContainer: '.chartContainer'
	}
}}

ReactDom.render(React.createElement(AdvancedChart, {
	plugins={enablePlugins}
}), document.querySelector('#app'))

```

This example will create a [CIQ.MarketDepth](https://documentation.chartiq.com/CIQ.MarketDepth.html) instance with a height 40% of the area of your main chart but will not create an Orderbook or a toggle to display the Orderbook. It will also pass in a custom account class to [CIQ.TFC](https://documentation.chartiq.com/CIQ.TFC.html)

## Notes
- This application will only run from `127.0.0.1`, `localhost`, and the explicit list of domains set on your particular ChartIQ library license. If you need to bind webpack dev server to a different host, like `http://0.0.0.0`, please contact your Account Manager to have those additional domains added to your license.

- Plugins require a library version of 7.2+
- If you are not using the ChartIQ library as a node package, you will need to make some additions to the webpack.common.js file in order to load the library. You will need to change the resolve key to include the following in order to tell Webpack where to resolve the library files:
```js
	resolve: {
		alias: {
			'chartiq/js/chartiq': path.join(chartiqDir,'js', 'chartiq'),
			'chartiq/js/componentUI': path.join(chartiqDir,'js', 'componentUI'),
			'chartiq/js/components': path.join(chartiqDir,'js', 'components'),
			'chartiq/js/addOns': path.join(chartiqDir,'js', 'addOns'),
			'chartiq/js/thirdparty/perfectScrollbar': path.join(chartiqDir,'thirdparty', 'perfect-scrollbar.jquery'),
		},
		extensions: ['.js', '.jsx'],
		modules: [
			'node_modules', 
			path.join('path', 'to', 'extracted', 'library'),
		]
	}
```
Where `chartiqDir` is the path to the extracted library files, (in previous releases of this project that was the _./chartiq_ folder). If you are attempting to use an earlier release than 7.2, you will need to provide aliases for the modules `chartiq`, `componentUI`, `components`, and `addOns` as well.
- The ScriptIQ plugin requires browser features not present in Internet Explorer; if you are transpiling the AdvancedChart be sure to remove this import.

## Questions and support

- Our development support team can be reached at [support@chartiq.com](mailto:support@chartiq.com).
- Our javascript documentation can be found at https://documentation.chartiq.com

## Contributing to this project

If you wish to contribute to this project, fork it and send us a pull request.
We'd love to see what it is you want to do with our charting tools!
