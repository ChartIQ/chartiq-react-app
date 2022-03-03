# ChartIQ React Components

## Contents

  - [Overview](#overview)
  - [Included Components](#included-components)
      - [Charts](#charts)
      - [Examples](#examples)
  - [Getting Started](#getting-started)
  - [Basic Customization](#basic-customization)
    - [Customizing the chart config](#customizing-the-chart-config)
    - [Adding your own quotefeed](#adding-your-own-quotefeed)
    - [Customizing Component Template](#customizing-component-template)
    - [Adding your own LookupDriver](#adding-your-own-lookupdriver)
  - [Setting add-ons](#setting-add-ons)
  - [Setting plug-ins](#setting-plug-ins)
  - [Advanced Customization](#advanced-customization)
## Overview

The ChartIQ React Components is a React component library featuring chart components that can be easily imported into an existing React application.

This package simplifies ChartIQ library use in the React framework. It requires ChartIQ library v8.6.0 or later.

**If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io> or you may evaluate one from [here](https://cosaic.io/chartiq-sdk-library-download/).**

## Included Components

Each component includes only the bare necessities to allow for maximum customization with the smallest size possible. To get started, we also include example components that come with ChartIQ's example files loaded.

#### Charts

- Chart &mdash; Core chart component to get started for financial time series charts.
- AdvancedChart &mdash; Full featured advanced chart component with everything needed for technical analysis.
- ActiveTrader/Workstation &mdash; Sets up an information-rich component ready for traders.
- CrossSection/Chart &mdash; Creates a working CrossSection (previously TermStructure) component for dealing with non-time-series data.

#### Examples

- ChartExample &mdash; CoreChart with all included ChartIQ example files.
- AdvancedExample &mdash; AdvancedChart with all included ChartIQ example files.
- ActiveTrader/WorkstationExample &mdash; Workstation with all included ChartIQ example files.
- CrossSection/ChartExample &mdash; CrossSection Chart with all included ChartIQ example files.

## Getting Started

After installing this package into your React project you will also need to copy and install the ChartIQ library using tarball from your license.

```js
npm install chartiq-8.6.0.tgz // or whatever version you are using from your copy of the ChartIQ library!
```

You can then import one of the included components into your React app:

```jsx
import Chart from '@chartiq/react-components'

export default function MyChart() {
	return <Chart />
}

```

## Basic Customization

Chart components use two primary props, config and resources, that allow them to be customized. The config describes how the chart should be set up, what addOns and plug-ins should be enabled, hotkeys, and more. Resources are passed to the chart and contain utilities that the chart should use, such as a quoteFeed or a storage constructor.

### Customizing the chart config

All components accept a config prop that can be modified to enable various features, set chart properties, load data, and more (for full documentation, see [ChartIQ Default Chart Configuration](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html)).

Components require only parts of the default that requires customization, although full configuration can be provided as well. For example, to create a chart with an initial symbol of 'FB' instead of 'AAPL' use:

```jsx
import Chart from @chartiq/react-components

export default function MyChart() {
	return <Chart config={{ initialSymbol: 'FB' }} />
}
```

which creates a chart with an initial symbol of 'FB' instead of 'AAPL' (the initial symbol of the default configuration).

### Adding your own quotefeed

All components will load simulated data using the quoteFeedSimulator so that you have some working data to get started. When you are ready to add your own quotefeed, it should be aded to the resources prop passed into the chart component. The quote feed simulator can be disabled by setting `quoteFeed` property in resources prop to a `null` value.

```jsx
import MyCustomQuotefeed from './myCustomQuotefeed'

<Chart resources={{ quoteFeed: MyCustomQuoteFeed }}/>
```

### Customizing Component Template

Every component accepts children that it will render instead of its default JSX template. You can start by copying the *Template.jsx* file from the *Chart/* directory to your own *src/* directory and making changes.

```jsx
import MyChartTemplate from './MyTemplate.jsx'

<Chart>
	<MyChartTemplate />
</Chart>
```

### Adding your own LookupDriver

The chart configuration includes the default Lookup.ChartIQ implementation, but you can substitute your own lookup driver to power symbol searches.

```jsx
import Chart from '@chartiq/react-components'
import CustomSymbolLookup from './myCustomSymbolLookup'

<Chart config={{ lookupDriver: CustomSymbolLookup }} />
```

More information about [Lookup Drivers](https://documentation.chartiq.com/CIQ.ChartEngine.Driver.Lookup.html) can be found in the [data integration](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html#main) ChartIQ Documentation.

## Setting add-ons

The default configuration contains initialization for all add-ons (see `config.addOns`) and filters that are enabled with the `config.enabledAddOns` property. If you would like to disable an add-on, set the value in `config.enabledAddOns` to null. For example, to disable the RangeSlider add-on:

```jsx
import Chart from 'chartiq/react-components/Chart'

<Chart config={{ enabledAddOns: { rangeSlider: null } }} />

```

If you would like to pass custom configuration options to a specific add-on then you must pass the arguments to the `config.addOns` property and make sure the add-on is included in the `config.enabledAddOns` property. For example: 

```jsx
import Chart from 'chartiq/react-components/Chart'
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
    continousZoom: true
  }
}
<Chart config={config} />
```

This configuration enables the continuous zoom add-on for daily data only with a custom boundary width.

## Setting plug-ins

ChartIQ comes with a variety of plug-ins that add enhanced functionality to charts. The default chart configuration contains entries to start plug-ins once they are imported.

**Note:** Plug-ins are optional extras that must be purchased. To determine the plug-ins included in your library, see the *./node_modules/chartiq/plugins* folder.

The application includes the ChartIQ plug-ins as component resources that are enabled by uncommenting the relevant imports in the component resources file.

For example, to enable the Trade from Chart (TFC) plug-in for `Core` Chart, uncomment the following lines in the [ChartExample.jsx](./src/Chart/ChartExample.jsx) file in the *./src/Chart/* folder:

```js
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';
```

Changing the default properties of the plug-ins is also as simple as passing in the arguments you prefer when setting up the plug-in. For example, to configure the ActiveTrader plug-in without the `orderbook` component and a custom height:

```js
import Chart from '@chartiq/react-components/Chart'
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

To enable the Market Depth chart and L2 Heat Map when using `AdvancedChart` from [Chart/Advanced](./src/Chart/Advanced.jsx) inside your own component 

```js
#MyComponent.js
import Chart, { CIQ } from "@chartiq/react-components/Chart/Advanced"
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
import Chart from '@chartiq/react-components'

export default function MyTimeSeriesChart() {
  return <Chart config={{ plugins: { crosssection: null } }} />
}
```

## Advanced Customization

It is possible customize the web components that are rendered inside the *Template.jsx* files. To see an example, refer to [ChartIQ React App README](https://github.com/chartiq/chartiq-react-app/#customization).

Additional documentation on web components in the ChartIQ library can be found at [documentation.chartiq.com](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html).