# chartiq-react-app

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Component customization and configuration](#component-customization-and-configuration)
- [Project structure](#project-structure)
- [Building the project](#building-the-project)
- [Adding a chart to an application](#adding-a-chart-to-an-application)
- [Accessing the chart engine](#accessing-the-chart-engine)
- [Integrating a quote feed](#integrating-a-quote-feed)
- [Advanced customization](#advanced-customization)
- [Configuring add-ons](#configuring-add\-ons)
- [Configuring plug-ins](#configuring-plug\-ins)
- [Using components in Create React App](#using-components-in-create-react-app)
- [Customizing ChartIQ web components](#customizing-chartiq-web-components)
- [Notes](#notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)


## Overview

ChartIQ's React component toolkit enables you to create custom charting applications using the React JavaScript library.

The toolkit was created by wrapping ChartIQ's custom [web components](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html) in React components, enabling the web components to be used natively in React. The toolkit is located in the [src/chartiq](./src/chartiq) folder.

This README provides an example of using the React toolkit to create the equivalent of ChartIQ's advanced chart application (*technical-analysis-chart.html*), which is included in the ChartIQ SDK (see an [example implementation](https://demo.chartiq.com)).


## Requirements

- A copy of the ChartIQ library, version 8.0.0 or later.

    If you do not have a copy of the library, please contact your ChartIQ account manager or send an email to [support@chartiq.com](mailto:support@chartiq.com).


## Getting started

To implement this project:

1. Clone the repository
2. Extract the contents of your zipped ChartIQ library package
3. Copy the tarball (.tgz file) from the extracted library package into the root of this project
4. Run the following commands from the root of the project:
    - `npm install ./chartiq-x.x.x.tgz` to install the charting library
    - `npm install` to install the rest of the dependencies
    - `npm start` to start up the development server
5. Open your browser to [http://localhost:4002](http://localhost:4002) to load the application

**Note:** When you are upgrading or changing your license, we recommend that you completely remove the old library before reinstalling the new one, for example:

```sh
npm uninstall chartiq
npm install ./chartiq-x.x.x.tgz
```

See also [Building the project](#building-the-project).


## Component customization and configuration

This project illustrates the use of `AdvancedChart`, a highly configurable custom React component. `AdvancedChart` is part of the React component toolkit. See *[src/chartiq/containers/AdvancedChart.jsx](./src/chartiq/containers/AdvancedChart.jsx)* for the definition of the component.

`AdvancedChart` incorporates many of the ChartIQ React components to create the equivalent of ChartIQ's advanced chart application, *technical-analysis-chart.html*, which is located in the root folder of the ChartIQ SDK.

The `AdvancedChart` component provides the following optional properties:
- `config` &mdash; Configuration object with about 200 configuration properties
- `chartInitialized` &mdash; Callback function providing access to `chartEngine` and context objects once the chart is initialized
- `pluginsToLoadLazy` &mdash; Object containing a list of plug-in names and corresponding resources to be loaded after the main files have been loaded

A list of default properties is available in *[src/chartiq/_config.js](./src/chartiq/_config.js)*, which can be used as a guide for creating custom configurations and for understanding the inner structure of the `AdvancedChart` component.

We strongly recommend that the pattern outlined in *[main.js](./src/main.js)* and *[src/chartiq_config](./src/chartiq_config)* is followed when customizing configurations. We also recommend that the default format is maintained as much as possible, extending and modifying required areas only. This approach will simplify future release integration.

Displaying editor contents side by side with the browser while running `npm start` enables you to quickly assess configuration changes. Editor code completion typically provides information on available configuration options.

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
├── chartiq_config               # Custom configuration folder
├── examples.js                  # Example application
├── main.js                      # Main AdvancedChart component application
├── .babelrc
├── index.html                   # Template for webpack
├── webpack                      # Configurations for webpack
└── webpack.config.js            # Main webpack configuration
```


## Building the project

If you want to use the ChartIQ advanced chart sample in its default state in your own React project, simply run the following command to generate the production bundle file:

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


## Adding a chart to an application

To add the `AdvancedChart` component to your React application,

1. Copy the following files and folders from the project *src* folder to the *src* folder of your app:

   - **_chartiq_** folder &mdash; Provides React components and wrappers that help integrate the library UI layer into the React environment; for example, *preload.js* prepares jQuery (installed with npm) for component use

   - **_chartiq_config_** folder &mdash; Imports and configures resources from the ChartIQ library

   - **_[main.js](./src/main.js)_** &mdash; Renders the `AdvancedChart` component

2. Revise the call to `ReactDom.render` in *main.js* to include the chart in your application:

   ```js
   ReactDom.render(
       <div>
           <TitleComponent>My Chart</TitleComponent>
           <AdvancedChart config={config}/>
       </div>,
       document.querySelector("#app")
   );
   ```

**Note:** By default, the `AdvancedChart` component takes up 100% of the width and height of its parent element. If the parent element (such as a table cell) does not have defined height or width, the chart height or width (respectively) is set to the minimum possible value, which can distort the appearance of the chart.


## Accessing the chart engine

You can access the [ChartEngine](https://documentation.chartiq.com/CIQ.ChartEngine.html) and [Context](https://documentation.chartiq.com/CIQ.UI.Context.html) objects of the application using the `chartInit` callback function property provided by the `AdvancedChart` state.

The following example shows how you would stream data into the chart instead of relying on a quote feed:

```js
const chartInitialized = ({ chartEngine }) => {
	startCustomFeed();

	function startCustomFeed() {
		if (!chartEngine.quoteDriver || !chartEngine.masterData) {
			// If quote driver has not been initialized, wait and try again.
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

```js
// src/main.js
const config = getDefaultConfig();

config.quoteFeed = new CIQ.QuoteFeed.Xignite(null, { useSuperQuotes: true });

ReactDom.render(<AdvancedChart config={config}/>, document.querySelector("#app"))

```

The standard configuration uses the quote feed simulator from the ChartIQ SDK as the quote feed for `AdvancedChart`. If you do not provide your own quote feed, `AdvancedChart` uses simulated data from the quote feed simulator.

**Note:** The quote feed simulator is intended for development only.

If your application uses streaming data (see [Accessing the chart engine](#accessing-the-chart-engine)), a static data load, or other data source instead of a quote feed, you must disable the quote feed in *src/main.js* or *src/chartiq/index.js*.

For more information about building a custom quote feed to provide data for your React application, see our [quote feed tutorial](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html).


## Advanced customization

The `AdvancedChart` component is designed as a full-featured, drop-in charting component that allows extensive configuration. However, you may want to customize the component, in which case we advise keeping the extended component separate from the toolkit folder, */src/chartiq*, to simplify future upgrades.


## Configuring add-ons

Add-ons available in the ChartIQ SDK are compatible with this project. The `AdvancedChart` component configuration has an `addOns` property that allows add-ons to be individually configured. The `addOns` property is an object where each key corresponds to the add-on from the SDK with the first letter of the add-on name in lowercase. By default, the chart attempts to enable all add-ons listed in the configuration.

By setting the library in development mode as follows:

```js
CIQ.debug = true
```
you will be able to see the list of enabled plug-ins and configurations in your browser's developer console.


## Configuring plug-ins

Similar to the way add-ons work, plug-ins can be configured using the configuration passed to the `AdvancedChart` component.

Preconfigured sets of plug-in resources are available in the *src/main.js* file. An alternative is to manage resources and plug-in imports in a single file such as the *[src/chartiq_config/resources.js](./src/chartiq_config/resources.js)* file.

Not all library licenses include the plug-ins listed in *resources.js*. To avoid compilation errors, you need to delete or comment out any of the plug-ins not available to you. Commenting out unused plug-ins also reduces bundle size.

The *resources.js* file includes resources such as:
- Life Cycle Events
- ScriptIQ
- Trade from Chart (TFC)

Additional plug-ins should be imported here as well. Most plug-ins use lazy loading to reduce the initial load time.


## Using components in Create React App

To use this project's components with the Create React App build tool:

- Copy the *chartiq* and *chartiq_config* folders from the project *src* folder to the application *src* folder
- Install the ChartIQ tarball:
  ```sh
  npm install chartiq-x.x.x.tgz
  ```
- Install node-sass and jQuery:
  ```sh
  npm install node-sass -D
  npm install jquery
  ```
- Copy the contents of the project *[main.js](./src/main.js)* file to the application *src/App.js* file, and then delete the following code block from *App.js*:
  ```js
  // Comment rendering to DOM if used only as export for example in CRA App.js.
  const el = document.querySelector('#app');
  if (el) {
	  ReactDom.render(<AdvancedChart
		  config={config}
		  chartInitialized={chartInitialized}
		  pluginsToLoadLazy={pluginsToLoadLazy}
		  />,
		  el
	  );
  }
  ```


## Customizing ChartIQ web components

ChartIQ web components can be customized by extending the web component classes. Customization code should run at the time the chart and user interface are created. We recommend keeping all customization code in a single file or folder to simplify library version upgrades.

Here's an example of customizing the `cq-chart-title` component:

```js
// Access the web component classes.
import { CIQ } from 'chartiq/js/componentUI';

// Access the class definition of the web component.
const ChartTitle = CIQ.UI.components('cq-chart-title')[0].classDefinition;

// Extend the web component class.
class CustomChartTitle extends ChartTitle {
    update() {
        // Execute the original method.
        super.update();
        // Update the chart title.
        const { symbol, symbolDisplay } = this.context.stx.chart;
        // If symbolDisplay is available, use it in the document title.
        if (symbolDisplay) {
            document.title = document.title.replace(symbol, symbolDisplay);
        }
    }
}

// Update the web component definition.
CIQ.UI.addComponentDefinition('cq-chart-title', CustomChartTitle);
```


## Notes

- This application runs only from IP address `127.0.0.1`, hostname `localhost`, or the explicit list of domains set on your ChartIQ library license. If you need to bind the webpack development server to a different host, please contact your ChartIQ account manager to have additional domains added to your license.

- If the web component polyfill is not required for supported browsers, the download size can be reduced by removing the polyfill script tag in the *index.html* file.

- As of version 8.0.0 of the charting library, this project no longer supports Internet Explorer 11. Please contact [support@chartiq.com](mailto:support@chartiq.com) for information on using version 7.5.0 of the charting library to enable this project to work with IE 11.


## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.


## Contributing to this project

Contribute to this project. Fork it and send us a pull request.
We'd love to see what you can do with our charting tools!