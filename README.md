# ChartIQ React Application

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Customization](#customization)
  - [Web component templates](#web-component-templates)
  - [Configuration](#configuration)
  - [Customizing the chart config](#customizing-the-chart-config)
  - [Adding your own quotefeed](#adding-your-own-quotefeed)
  - [Adding your own LookupDriver](#adding-your-own-lookupdriver)
  - [Template component customization](#template-component-customization)
  - [Component integration](#component-integration)
- [Setting add-ons](#setting-add-ons)
- [Setting plug-ins](#setting-plug-ins)
- [Important notes](#important-notes)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)

## Overview

The ChartIQ React application features components that enable you to build charting applications in the React framework. The components include everything from a basic chart to a complex, active trader desktop.

React components are in src/components

- `Chart (Chart/Core)` — Creates a basic chart with a basic user interface. Use with Core package.
- `AdvancedChart (Chart/Advanced)` — Creates a full-featured chart with a fully developed user interface. Use with Technical Analysis package.
- `ActiveTraderWorkstation (ActiveTrader/Workstation)` &mdash; Sets up an information-rich desktop for traders who trade frequently.
- `TermStructure (CrossSection/Chart)` &mdash; Creates a term structure chart for working with non-time-series data.
- `MultiChart` &mdash; Provides the ability to use multiple charts in a grid, managed by a single UI.

### Examples

- ChartExample &mdash; CoreChart with all included ChartIQ example files.
- AdvancedExample &mdash; AdvancedChart with all included ChartIQ example files.
- ActiveTrader/WorkstationExample &mdash; Workstation with all included ChartIQ example files.
- CrossSection/ChartExample &mdash; CrossSection Chart with all included ChartIQ example files.
- MultiChart &mdash; Provides the ability to use multiple charts in a grid, managed by a single UI.

Custom implementations in *src/containers/*

- `CustomChart` &mdash; Integrates native React components with ChartIQ W3C-standard web components.
- `HelloWorld` &mdash; Creates a basic chart with no user interface as a starting point for your React app.

## Requirements

- A copy of the ChartIQ JavaScript library (works best with version 10.1.0).
  - If you do not have a copy of the library or need a different version, please contact your account manager or visit our <a href="https://pages.marketintelligence.spglobal.com/ChartIQ-Follow-up-Request.html" target="_blank">Request Follow-Up Site</a>.

## Getting started

**Important:** When installing a package directly from npm (beginning with ChartIQ v9.5.1), the defaults are not npm compatible and will require adjustments.

To implement this project **using the ChartIQ tarball**:

1. Clone the repository.
2. Extract the contents of your zipped ChartIQ library package.
3. Copy the tarball (.tgz file) from the extracted library package into the root of this project.
4. Run the following command from the root of the project:
    - `npm install ./chartiq-x.x.x.tgz` to install the charting library
5. If you want to locate your key.js file somewhere other than within the tarball, change the
webpack.config.js resolve.alias property to point to the proper key.js path. Alternatively, you may
specify the path directly when importing the key.js file.

**Continue with the following steps:**

- Run the following commands from the root of the project:
  - `npm install` to install the rest of the dependencies
  - `npm start` to start up the development server
- Open your browser to [http://localhost:4002](http://localhost:4002) to load the application.

**Note:** When you are upgrading or changing your license using the tarball, we recommend that you completely remove the old library before reinstalling the new one, for example:

```sh
npm uninstall chartiq
npm install ./chartiq-x.x.x.tgz
```

## Customization

### Web component templates

The *Template.jsx* files of the `AdvancedChart`, `ActiveTraderWorkstation`, and `TermStructure` components, as well as the `render` method of `CustomChart`, contain JSX to render HTML markup for a collection of ChartIQ's user interface web components. You can customize the chart user interface by adding, removing, or modifying UI components. Additionally, can add your own custom React components.

### Configuration

In addition to customizing html markup for the included webcomponents, you can configure a variety of chart features by modifying the default configuration object provided to the component definition files of `CustomChart`, `ActiveTrader/Workstation`, `MultiChart` and `CrossSection/Chart`. Sample configurations are available as `getConfig` and `getCustomConfig` functions in the resources files.

A default configuration is part of the ChartIQ library.

### Customizing the chart config

All components accept a config prop that can be modified to customize the default configuration to enable various features, set chart properties, load data, and more. For full documentation, see [ChartIQ Default Chart Configuration](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html).

Components require only parts of the default that requires customization, although full configuration can be provided as well. For example, to create a chart with an initial symbol of 'FB' instead of 'AAPL' use:

```jsx
import Chart from './components/Chart/ChartExample.jsx'

export default function MyChart() {
  return <Chart config={{ initialSymbol: 'FB' }} />
}
```

which creates a chart with an initial symbol of 'FB' instead of 'AAPL' (the initial symbol of the default configuration).

### Adding your own quotefeed

All components will load simulated data using the quoteFeedSimulator so that you have some working data to get started. When you are ready to add your own quotefeed, it should be added to the resources prop passed into the chart component. The quote feed simulator can be disabled by setting `quoteFeed` property in resources prop to a `null` value.

```jsx
import MyCustomQuotefeed from './myCustomQuotefeed'

<Chart resources={{ quoteFeed: MyCustomQuoteFeed }}/>
```

### Adding your own LookupDriver

The chart configuration includes the default Lookup.ChartIQ implementation, but you can substitute your own lookup driver to power symbol searches.

```jsx
import Chart from './components/Chart'
import CustomSymbolLookup from './myCustomSymbolLookup'

<Chart config={{ lookupDriver: CustomSymbolLookup }} />
```

More information about [Lookup Drivers](https://documentation.chartiq.com/CIQ.ChartEngine.Driver.Lookup.html) can be found in the [data integration](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html#main) ChartIQ Documentation.

### Template component customization

ChartIQ web components can be customized by extending the web component classes. Customization code should run right after the library imports and before the first chart in the document is created. We recommend keeping all customization code in a single file or folder to simplify library version upgrades.

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

### Component integration

`CustomChart` integrates native React components with ChartIQ's W3C-standard web components.

The `ShortcutDialog` component is an example of a React component accessed by a web component. User interaction with a dropdown menu created by a ChartIQ `cq-menu` web component opens the dialog box created by the `ShortcutDialog` component. The dialog box enables users to set shortcut keys on the chart's drawing tools.

## Setting add-ons

The default configuration contains initialization for all add-ons (see `config.addOns`) and filters that are enabled with the `config.enabledAddOns` property. If you would like to disable an add-on, set the value in `config.enabledAddOns` to null. For example, to disable the RangeSlider add-on:

```jsx
import Chart from './components/Chart/ChartExample.jsx'

<Chart config={{ enabledAddOns: { rangeSlider: null } }} />

```

If you would like to pass custom configuration options to a specific add-on then you must pass the arguments to the `config.addOns` property and make sure the add-on is included in the `config.enabledAddOns` property. For example:

```jsx
import Chart from './components/Chart/ChartExample.jsx'
const config = {
  addOns: {
    continuousZoom: {
      periodicities: [
        // daily interval data
        {period: 1,   interval: "month"},
        {period: 1,   interval: "week"},
        {period: 1,   interval: "day"},
      ],
      boundaries: {
        maxCandleWidth: 20,
        minCandleWidth: 5
      }
    }
  },
  enabledAddOns: {
    continuousZoom: true
  }
}
<Chart config={config} />
```

This configuration enables the continuous zoom add-on for daily data only with a custom boundary width.

## Setting plug-ins

ChartIQ comes with a variety of plug-ins that add enhanced functionality to charts. The default chart configuration contains entries to start plug-ins once they are imported.

> **Note:** Plug-ins are optional extras that must be purchased. To determine the plug-ins included in your library, see the *./node_modules/chartiq/plugins* folder.
The application includes the ChartIQ plug-ins as component resources that are enabled by uncommenting the relevant imports in the component resources file.

For example, to enable the Trade from Chart (TFC) plug-in for `Core` Chart, uncomment the following lines in the [ChartExample.jsx](./src/Chart/ChartExample.jsx) file in the *./src/Chart/* folder:

```js
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';
```

Changing the default properties of the plug-ins is also as simple as passing in the arguments you prefer when setting up the plug-in. For example, to configure the ActiveTrader plug-in without the `orderbook` component and a custom height:

```js
import Chart from './components/Chart/ChartExample.jsx'
import 'chartiq/js/plugins/activeTrader/cryptoiq'

const config = {
  plugins: {
    marketDepth: {
      volume: true,
      mountain: true,
      step: true,
      record: true,
      height: "35%",
      orderbook: false,
      interaction: true
      },
  }
}

<Chart config={config} />
```

To enable the Market Depth chart and L2 Heat Map when using `AdvancedChart` from [Chart/Advanced](./src/components/Chart/Advanced.jsx) inside your own component

```js
#MyComponent.js
import Chart, { CIQ } from "./components/Chart/Advanced.jsx"
import 'chartiq/plugins/activetrader/cryptoiq';
import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

// Don't forget to turn on L2 data simulation!
function simulate({ chartEngine }) {
    CIQ. simulateL2({ chartEngine, onInterval: 1000, onTrade: true });
}

export default function MyComponent() {
    return <Chart chartInitialized={simulate} />
}
```

There may be a scenario (like loading multiple charts in one document or a single page app) where you need to manually disable a plug-in for a certain chart. To disable a plug-in, set its value in `config.plugins` to `null`. For example, to load a cross section chart with a time series chart:

```jsx
import Chart from './components/Chart/ChartExample.jsx'

export default function MyTimeSeriesChart() {
  return <Chart config={{ plugins: { crosssection: null } }} />
}
```

## Important notes

- This application runs only from IP address `127.0.0.1`, hostname `localhost`, or the explicit list of domains set on your ChartIQ license. If you need to bind the webpack development server to a different host, please contact your account manager to have additional domains added to your license.

- If the web component polyfill is not required for supported browsers, the download size can be reduced by removing the polyfill script tag in the *index.html* file.

## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at <https://documentation.chartiq.com>.

## Contributing to this project

Fork it and send us a pull request. We'd love to see what you can do with our charting tools in React!
