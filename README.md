# chartiq-react-app

**Requirements:** ChartIQ SDK v7.3.0


## Contents
- [Overview](#overview)
- [Installation and getting started](#installation-and-getting-started)
- [Component customization and configuration](#component-customization-and-configuration)
- [Project structure](#project-structure)
- [Building the project](#building-the-project)
- [Accessing the chart engine](#accessing-the-chart-engine)
- [Integrating a quote feed](#integrating-a-quote-feed)
- [Advanced customization](#advanced-customization)
- [Configuring add-ons](#configuring-add\-ons)
- [Configuring plug-ins](#configuring-plug\-ins)
- [Notes](#notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)


## Overview

ChartIQ's React component toolkit enables you to create custom charting applications in the React framework.

The toolkit was created by wrapping ChartIQ's native [web components](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html) in React components, enabling them to be used natively within the React framework. The toolkit is located in the [src/chartiq](./src/chartiq) folder.

This README provides an example of leveraging the React toolkit to implement ChartIQ's advanced chart application (*sample-template-advanced.html*), which comes with the ChartIQ SDK.


## Installation and getting started

To use this project, you need to include a copy of the ChartIQ library. We recommend that you install the library from the tarball you received in your license. If you do not have a copy of the library, please contact your ChartIQ account manager before continuing this installation.

**Note:** SDK version 7.3.0 (*chartiq-7.3.0.tgz*) or later is required to use the React component toolkit.

To install the ChartIQ library, run the following command:

```sh
npm install ./path-to/chartiq-x.x.x.tgz
```

When you are upgrading or changing your license, we recommend that you completely remove the old library before reinstalling the new one, for example:

```sh
npm remove chartiq
npm install ./path-to-new/chartiq-x.x.x.tgz
```

After you have installed the library, you can view the charting component created by this project by running:

```sh
npm run start
```

and then opening your browser to http://localhost:4002.

To build for production, run:

```sh
npm run build
```

The resulting bundle will be in the */dist* folder.

For more about building this project, see [Building the project](#building-the-project).


## Component customization and configuration

This project illustrates the use of `AdvancedChart`, a highly configurable custom React component. `AdvancedChart` is part of the React component toolkit. See *[src/chartiq/containers/AdvancedChart.jsx](./src/chartiq/containers/AdvancedChart.jsx)* for the definition of the component.

`AdvancedChart` incorporates many of the ChartIQ React components to create ChartIQ's advanced chart application, *sample-template-advanced.html*, which is located in the *examples/templates* folder of the ChartIQ SDK.

The `AdvancedChart` component provides the following optional properties:
- `config` &mdash; Configuration object with about 200 configuration properties
- `chartInitialized` &mdash; Callback function providing access to `chartEngine` and context objects once the chart is initialized
- `pluginsToLoadLazy` &mdash; Object containing a list of plug-in names and corresponding resources to be loaded after the main files have been loaded

A list of default properties is available in *[src/chartiq/_config.js](./src/chartiq/_config.js)*, which can be used as a guide for creating custom configurations and for understanding the inner composition structure of the `AdvancedChart` component.

We strongly recommend that the pattern outlined in *[main.js](./src/main.js)* and *[src/custom_chartiq_config](./src/custom_chartiq_config)* is followed when customizing configurations. We also recommend that the default format is maintained as much as possible, extending and modifying required areas only. This approach will simplify future release integration.

Displaying editor content side by side with the browser while running `npm start` enables you to quickly assess configuration changes. Editor code completion typically provides information on available configuration options.

![Configuration edit](./_resources/ChartIQ_ReactApp_config_editing.gif)


## Project Structure

```sh
src
├── chartiq
│   ├── components               # React components folder
│   ├── containers               # React containers folder
│   ├── context                  # React context folder
│   ├── examples                 # Collection of composition or individual component samples
│   ├── styles                   # Required CSS (or Sass) styles
│   ├── webcomponent-containers  # Web components that extend the standard ChartIQ library web components
│   ├── _config.js               # Default configuration
│   ├── index.js                 # List of plug-in imports and React component exports
├── custom_chartiq_config        # Custom configuration folder
├── examples.js                  # Example application
├── main.js                      # Main AdvancedChart component application
├── .babelrc
├── index.html                   # Template for webpack
├── webpack                      # Configurations for webpack
└── webpack.config.js            # Main webpack configuration
```


## Building the project

If you want to use the ChartIQ advanced chart sample in its default state and use it in your own React project, simply run the following command to generate the production bundle file:

```sh
npm run build
```

The bundle will be created in the *dist/* folder.

In addition to `AdvancedChart`, you can build several other components in the example folder by running:

```sh
npm run watch:unified
```

You can view the components at [http://localhost:4002](http://localhost:4002).

This project uses [webpack-merge](https://github.com/survivejs/webpack-merge) to keep the project configurations manageable and allow each component to be built individually. The standard *webpack.config.js* file pulls in configurations for each component from the *webpack/* folder and merges them together to build the project. By default, the project builds the `AdvancedChart` component, but you can change the build target by setting the `env.build` variable that you pass into *webpack.config.js*.

If you would like to build a specific component, we recommend that you add your own build script to *package.json*.

The following example shows how to add a script to build the `MarketDepth` component for production. The `env.build` variable has been set to reference the *webpack/webpack.market-depth.js* file in *webpack.config.js*.

```json
"build:marketDepth": "webpack --config=webpack.config.js --env.production --env.build=marketDepth"
```

See [Advanced customization](#advanced-customization) for more details on custom builds.


## Accessing the chart engine

You can access the [ChartEngine](https://documentation.chartiq.com/CIQ.ChartEngine.html) and [Context](https://documentation.chartiq.com/CIQ.UI.Context.html) objects of the application using the `chartInit` callback function property provided by the `AdvancedChart` state.

The following example shows how you would stream data into the chart instead of relying on a quote feed:

```javascript
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


## Integrating a quote feed

The `AdvancedChart` component is designed to take your custom quote feed from the configuration. For example, to use the Xignite quote feed included in the ChartIQ SDK, you would need to import the quote feed and make the following changes to *src/main.js* in your React project:

```javascript
// src/main.js
const config = getConfiguration();

config.quoteFeed = new CIQ.QuoteFeed.Xignite(null, { useSuperQuotes: true });

ReactDom.render(<AdvancedChart config={config}), document.querySelector("#app"))

```


The standard configuration uses the quote feed simulator from the ChartIQ SDK as the quote feed for `AdvancedChart`. If you do not provide your own quote feed, `AdvancedChart` uses simulated data from the quote feed simulator.

**Note:** The quote feed simulator is intended for development only.

If your application uses streaming data (see [Accessing the chart engine](#accessing-the-chart-engine)), a static data load, or other data source instead of a quote feed, you must disable the quote feed in *src/main.js* or *src/chartiq/index.js*.

For more information about building a custom quote feed to provide data for your React application, see our [quote feed tutorial](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html).


## Advanced customization

The `AdvancedChart` component is designed as a full-featured, drop-in charting component that allows extensive configuration. However, you may want to customize the component, in which case we advise keeping the extended component separate from the toolkit folder, */src/chartiq*, to simplify future upgrades.


## Configuring add-ons

Add-ons available in the ChartIQ SDK are compatible with this project. The `AdvancedChart` component configuration has an `addOns` property that allows add-ons to be individually configured. The `addOns` property is an object where each key corresponds to the add-on from the SDK with the first letter of the add-on name in lowercase. By default, the chart attempts to enable all add-ons listed in the configuration. By setting the library in development mode as follows:

```javascript
CIQ.debug = true
```
you will be able to see the list of enabled plug-ins and configurations in your browser's developer console.


## Configuring plug-ins

Similar to the way add-ons work, plug-ins can be configured using the configuration passed to the `AdvancedChart` component.

Plug-in imports are managed in the *[src/custom_chartiq_config/resources.js](./src/custom_chartiq_config/resources.js)* file.

Not all library licenses include the plug-ins listed in *resources.js*. To avoid compilation errors, you need to delete or comment out any of the plug-ins not available to you. Commenting out unused plug-ins also reduces bundle size.

The *resources.js* file includes resources such as:
- CryptoIQ
- ScriptIQ
- TradeFromChart (TFC)

Additional plug-ins should be imported here as well. Most plug-ins use lazy loading to reduce the initial load time.


## Notes

- This application runs only from IP address `127.0.0.1`, hostname `localhost`, or the explicit list of domains set on your ChartIQ library license. If you need to bind the webpack development server to a different host, like `http://0.0.0.0`, please contact your ChartIQ account manager to have additional domains added to your license.

- If the web component polyfill is not required for supported browsers, the download size can be reduced by removing the polyfill script tag in the *index.html* file.


## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.


## Contributing to this project

Contribute to this project. Fork it and send us a pull request.
We'd love to see what you can do with our charting tools!