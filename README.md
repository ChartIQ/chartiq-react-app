# chartiq-react-app

**Requirements:** ChartIQ SDK v7.2.0+ 

## Overview

This project is an implementation of ChartIQ's Advanced Chart application written for the React framework. 
It wraps ChartIQ's native [Web Components](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html) and is fully interoperable with the advanced HTML template (*sample-template-advanced.html*) that comes with the ChartIQ SDK.

## Table of contents
- [Installation and getting started](#installation-and-getting-started)
- [Component customization and configuration](#component-customization-and-configuration)
- [Project structure](#project-structure)
- [Building the project](#building-the-project)
- [Accessing the Chart Engine](#accessing-the-chart-engine)
- [Integrating a QuoteFeed](#integrating-a-quotefeed)
- [Advanced customization](#advanced-customization)
- [Configuring AddOns](#configuring-addons)
- [Configuring Plugins](#configuring-plugins)
- [Notes](#notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)



## Installation and getting started

To use this project you will need to include a copy of the ChartIQ library. It is recommended that you install the library from the tarball that you received in your license. If you do not have a copy of the library, please contact your account manager before continuing this installation.

This project lists the chartiq tarball as an optional dependency from the root of the repo. If you do not keep your tarball here, you will need to specify where it is located and install manually.

```
npm install ./path-to/chartiq-7.2.0.tgz
```

When you are upgrading or changing your license it is recommended that you completely remove the old tarball before reinstalling the new one

```
npm remove chartiq
npm install ./path-to-new/chartiq-7.2.0.tgz
```

Once the library is installed it can be viewed at http://localhost:4002 by running 
```
npm run start
```

To build for production with resulting bundle in /dist folder use
```
npm run build
```

- For more about building this project see [Building the project](#building-the-project).

## Component customization and configuration

The sample use of a highly configurable chart component is available in [src/chartiq/main.js](.src/chartiq/main.js). It is using AdvancedChart component that provides following optional properties
- config (configuration with around 200 configuration properties) 
- chartInialized (callback function providing access to chartEngine and context objects once chart is initialized)
- pluginsToLoadLazy (object with keys of plugin names and values function invoking dynamic import)

List of default properties are available in [src/chartiq/_config.js](.src/chartiq/_config.js) and can be used as a guide to create custom configurations as well understanding of the inner composition structure for the AdvanceChart component.

It is recommended to follow the pattern in the [main.js](.src/chartiq/main.js) file for customizing configuration starting with default configuration is customized or extended only in required areas. Using this approach is likely to simplify upcoming feature integration. 

## Project Structure

```
src
├── chartiq
│   ├── components               # React components folder
│   ├── containers               # React containers folder
│   ├── context                  # React context folder
│   ├── examples                 # collection of composition or individual compnents samples
│   ├── styles                   # required css (or sass) styles
│   ├── webcomponent-containers  # select webcomponets to extending chartiq library webcomponent
│   ├── _config.js               # default configuration
│   ├── index.js                 # plugin imports and exports of components without dependencies required
├── custom_chartiq_config        # custom configuration folder
├── examples.js                  # example application
├── main.js                      # main AdvancedChart component application
├── polyfill.js
├── .babelrc
├── index.html                   # template for webpack
├── webpack                      # configurations for webpack
└── webpack.config.js            # main webpack configuration
```


## Building the project

If you wish to use the ChartIQ `<AdvancedChart />` sample in its default state, you may build the component right away and use in your own React project. Simply run the npm script `npm run build` to generate the javascript bundle file, which can be found in the `dist/` folder.

In order to keep the bundle size as small as possible this project does not, by default, support older browsers. You may optionally include polyfills for legacy browser support by running the npm script `npm run build:polyfill`. This script is identical to `npm run build` but will attach polyfills to the javascript bundle file for legacy browser support.

In addition to the `<AdvancedChart />` you can also build several other components in example folder by running `npm run watch:unified` and viewing them [http://localhost:4002](http://localhost:4002).

This project makes use of [Webpack Merge](https://github.com/survivejs/webpack-merge) to keep its configurations more manageable and allow for individual building of each component. The standard _webpack.config.js_ pulls in configurations for each component from the _webpack/_ folder and merges them together to build the project. By default the project builds the AdvancedChart but you can change the build target by setting the `env.build` variable that you pass into _webpack.config.js_. 

If you would like to build for a specific component, we recommend that you add your own build script to _package.json_. The example below shows how to add a node script to build the MarketDepth component for production. The `env.build` variable has been set to reference the _webpack/webpack.market-depth.js_ in _webpack.config.js_ : 
```json
"build:marketDepth": "webpack --config=webpack.config.js --env.production --env.build=marketDepth"
```

See [customizing the project](#customizing-the-project) for more details about on custom builds.

## Accessing the Chart Engine

You can access the [ChartEngine](https://documentation.chartiq.com/CIQ.ChartEngine.html) and the [UIContext](https://documentation.chartiq.com/CIQ.UI.Context.html) for the application via chartInit callback function property provided by `<AdvancedChart />` state.

In the example below you may want to stream data into the chart engine instead of relying on a quoteFeed. This example gets you started with streaming data.

``` js
const chartInitialized = ({ chartEngine }) => {
	startCustomFeed();

	function startCustomFeed() {
		if (!chartEngine.quoteDriver || !chartEngine.masterData) {
			// if quote driver has not been initialize wait and try again
			setTimeout(startCustomFeed, 5);
			return;
		}
		chartEngine.quoteDriver.die();
		chartEngine.updateChartData(
			{
				Close: 102.05, 
				Volume: 100,
				DT: new Date()
			}, 
			null, 
			{ fillGaps: true, useAsLastSale: true }
		);
	}
}
```

## Integrating a QuoteFeed

By default the Advanced Chart will fall back to using simulated data from the quoteFeedSimulater (designed for local development) in the ChartIQ SDK. The Advanced Chart component is designed to take your custom quoteFeed from configuration. For example, to use the XigniteQuoteFeed included in the ChartIQ SDK, you would need to import Xignite quote feed make the following changes to *src/main.js* in your React project: 

```js
// src/main.js
const config = getConfiguration();

config.quoteFeed = new CIQ.QuoteFeed.Xignite(null, { useSuperQuotes: true });

ReactDom.render(<AdvancedChart config={config}), document.querySelector("#app"))
	
```
For more information about building a custom quoteFeed to provide data for your React application, see the [quoteFeed documentation on ChartIQ's developer docs](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html).

## Advanced customization

The Advanced Chart component is designed as a full-feature drop-in charting component providing extensive configuration. However you may want to create further customization by extending available functionality in which case it would be advisable to keep them separate if possible from /src/chartiq folder to ease upgrading to future enhancements in chartiq folder.


## Configuring AddOns

AddOns available in the ChartIQ SDK are compatible with this project. The `<AdvancedChart />` component takes an addOns prop that allows for each addOn to be individually configured. The addOns prop is an object where each key corresponds with the addOn from the SDK. By default the chart will attempt to enable all addOns listed in configuration.  By setting library in development mode
```js
CIQ.debug = true
```
one will be able to see list of plugins and configuration loaded in browser developers console.


## Configuring Plugins

Similar to the way addOns work, you can configure the plugin options using configuration passed to AdvancedChart component. Plugins imports are managed in the [src/custom_chariq_config/resources.js](.src/custom_chariq_config/resources.js) file. Not all library licenses include plugins included in this file, to avoid compilation errors you will need to delete or comment out not available imports. Commenting out unused plugins will also reduce bundle size. The main.js file includes CryptoIQ, ScriptIQ, and TradeFromChart (TFC) plugins, additional plugins should be imported here as well. To increase responsivenes time to interaction on load time most plugins are loaded lazy.



## Notes
- This application will only run from `127.0.0.1`, `localhost`, and the explicit list of domains set on your particular ChartIQ library license. If you need to bind webpack dev server to a different host, like `http://0.0.0.0`, please contact your Account Manager to have those additional domains added to your license.

- Download size can be reduced if webcomponent polyfill is not required for supported browsers by removing polyfill script tag in index.html file

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
