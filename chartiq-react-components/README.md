# ChartIQ React Components

## Contents
- [Overview](#overview)
- [Included Components](#included-components)
  - [Charts](#charts)
- [Getting Started](#getting-started)
- [Basic Customization](#basic-customization)
  - [Customizing the Chart config](#customizing-the-chart-config)
  - [Adding a quotefeed](#adding-your-own-quotefeed)
  - [Modifying the Template](#customizing-component-template)
  - [Adding a lookup driver](#adding-your-own-lookupdriver)
- [Enabling add-ons](#enabling-add-ons)
- [Enabling plug-ins](#enabling-plug\-ins)
- [Advanced Customization](#advanced-customization)
## Overview

The ChartIQ React Components is a React component library featuring several advanced components that can be easily imported into an existing React application.

A copy of the ChartIQ library, version 8.4.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

**NOTE** While you can install the React components, they do require the ChartIQ library to work. If you do not have a copy of the library you may evaluate one from [here](https://cosaic.io/chartiq-sdk-library-download/).

## Included Components

Each component includes only the bare necessities to allow for maximum customization with the smallest size possible. To get started, we also include example components that come with ChartIQ's example files loaded.

The exported components include:

#### Charts

- Chart &mdash; Core chart component to get started for financial time series charts.
- AdvancedChart &mdash; Full featured advanced chart component with everything needed for technical analysis.
- ActiveTrader/Workstation &mdash; Sets up an information-rich component ready for traders.
- CrossSection/Chart &mdash; Creates a working CrossSection (previously TermStructure) component for dealing with non&ndash;time series data.

#### Examples
- ChartExample &mdash; CoreChart with all included ChartIQ example files.
- AdvancedExample &mdash; AdvancedChart with all included ChartIQ example files.
- ActiveTrader/WorkstationExample &mdash; Workstation with all included ChartIQ example files.
- CrossSection/ChartExample &mdash; CrossSection Chart with all included ChartIQ example files.


## Getting Started

After installing this package into your React project you will need to install the ChartIQ library (included separately).

```js
npm install chartiq-8.6.0 // or whatever version you are using!
```

You can then import one of the included components into your React app:

```jsx
import Chart from '@chartiq/react-components'

export default function MyChart() {
	return <Chart />
}

```

## Basic Customization

Chart components accept two basic props, config and resources, that allow them to be customized. The config describes how the chart should be set up, what addOns and plug-ins should be enabled, hotkeys, and more. Resources are passed to the chart and contain utilities that the chart should use, such as a quoteFeed or a storage constructor.

### Customizing the chart config

All components accept a config prop which can be modified to enable various features, set chart properties, load data and more (for full documentation see [ChartIQ Default Chart Configuration](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html)).

By default, you may pass in only the the parts of the config you want to customize, and these changes will be merged onto the the default configuration. For example:

```jsx
import Chart from @chartiq/react-components

export default function MyChart() {
	return <Chart config={{ initialSymbol: 'FB' }} />
}
```
creates a chart with an initial symbol of 'FB' instead of 'AAPL' (the initial symbol of the default configuration).

### Adding your own quotefeed

By default, all components will load the quoteFeedSimulator so that you have some working data to get started. When you are ready to add your own quotefeed, it should be aded to the resources prop passed into the chart component.
```jsx
import MyCustomQuotefeed from './myCustomQuotefeed'

<Chart resources={{ quoteFeed: MyCustomQuoteFeed }}}/>
```

### Customizing Component Template

Every component accepts children that it will render instead of its default JSX template. You can start by copying the Template.jsx file from the Chart/ directory to your own src/ directory and making changes.

```jsx
import MyChartTemplate from './MyTemplate.jsx'

<Chart>
	<MyChartTemplate>
</Chart>
```

### Adding your own LookupDriver

The chart configuration includes the default Lookup.ChartIQ implementation but you can substitute your own lookup driver to power symbol searches.

```jsx
import Chart from '@chartiq/react-components'
import CustomSymbolLookup from './myCustomSymbolLookup'

<Chart config={{ lookupDriver: CustomSymbolLookup }}/>
```

More information about [Lookup Drivers](https://documentation.chartiq.com/CIQ.ChartEngine.Driver.Lookup.html) can be found in the [data integration](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html#main) ChartIQ Documentation.


## Enabling add-ons

The default configuration enables add-ons by default. If you would like to disable an addon, set the value in config.enabledAddOns to null. For example to disable the RangeSlider add-on:

```jsx
import Chart from 'chartiq/react-components/Chart'

<Chart config={{enabledAddOns: { rangeSlider: null}}}/>

```
## Enabling plug-ins

ChartIQ comes with a variety of plug-ins that add enhanced functionality to charts. The default chart configuration contains entries to start plugins once they are imported.

**Note:** Plug-ins are optional extras that must be purchased. To determine the plug-ins included in your library, see the *./node_modules/chartiq/plugins* folder.

The application includes the ChartIQ plug-ins as component resources that are enabled by uncommenting the relevant imports in the component resources file.

For example, to enable the Trade from Chart (TFC) plug-in for `Core` Chart, uncomment the following lines in the [ChartExample.jsx](./src/Chart/ChartExample.jsx) file in the *./src/Chart/* folder:

```js
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';

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


## Advanced Customization

It is possible customize the webcomponents that are rendered inside the Template.jsx files. To see an example refer to [ChartIQ React App README](https://github.com/chartiq/chartiq-react-app/#customization).

Additional documentantion on web components in the ChartIQ library can be found on [documentation.chartiq.com](https://documentation.chartiq.com/tutorial-Web%20Component%20Interface.html).