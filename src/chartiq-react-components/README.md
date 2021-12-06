# ChartIQ React Components

## Overview

The ChartIQ React Components is a React component library featuring several advanced components that can be easily imported into an existing React application.

A copy of the ChartIQ library, version 8.4.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

**NOTE** While you can install the React components, they do require the ChartIQ library to work. If you do not have a copy of the library you may evaluate one from [here](https://cosaic.io/chartiq-sdk-library-download/).

## Getting Started

After installing this package into your React project you will need to install the ChartIQ library (included separately).

```js
npm install chartiq-8.4.0 // or whatever version you are using!
```

You can then import one of the included components into your React app:

```jsx
<Route path='/technical-analysis'
	render={() => (
		<AdvancedChart
			config={configObj}
			chartInitialized={chartInitialized}
			onChartReady={onChartReady}
		/>
	)}>
</Route>
```

## Included Components

The exported components include:

- HelloWorld &mdash; A simple HelloWorld example without any extra UI features to get you started.
- AdvancedChart &mdash; Full featured advanced chart component with everything needed for technical analysis.
- MultiChart &mdash; Implementation of dual AdvancedCharts in a single component.
- ActiveTraderWorkstation &mdash; Sets up an information-rich component ready for traders.
- TermStructure &mdash; Creates a working CrossSection (TermStructure) component for dealing with non&ndash;time series data.

## Basic Customization

### Customizing the chart config

All components work with the default configuration for the chart which can be modified to enable various features, set chart properties, load data, setup quotefeeds and more (for full documentation see [ChartIQ Default Chart Configuration](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html)).

There are two ways you can get the config for a component. You can import `getConfig` or `getCustomConfig` from the components resources file. Each will return a chart config object that you can adjust.

The `getConfig` method will import the defaultConfig from the ChartIQ SDK and add the quoteFeedSimulator so you can immediately get started developing with simulated data.

The `getCustomConfig` method will return a specific config for each component. **If you do not provide a config prop, this is what will be used.**

```js
import {
		getConfig,
		getCustomConfig
	} from @chartiq/chartiq-react-components/containers/AdvancedChart/resources

const config = getConfig()
config.initialSymbol = 'FB'
```

Each method accepts a resources object where you can pass a quotefeed, nameValueStore, and more. Full documentation can be found [here](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html)

### Adding your own quotefeed

By default all components will load the quoteFeedSimulator so that you have some working data to get started with. When you are ready to add your own quotefeed, it should be aded to the config prop passed into the chart component.

After importing your own quotefeed, and getting a config to pass into the chart, assign your quotefeeed to the config and  pass it to the component as a prop.

```jsx
import MyCustomQuotefeed from './myCustomQuotefeed'
import { getCustomConfig } from '@chartiq/chartiq-react-components/containers/AdvancedChart/resources'

const config = getCustomConfig({ quoteFeed: myCustomQuoteFeed })

<AdvancedChart config={config}/>
```

### Customizing Component Template

Every component accepts children that it will render instead of its default JSX template. 
### Addiong your own LookupDriver

The chart configuration includes the default Lookup.ChartIQ implementation but you can substitute your own lookup driver to power symbol searches. After getting a config object you can assign a custom lookup.

```jsx
import customSymbolLookup from './myCustomSymbolLookup'
import { getCustomConfig } from '@chartiq/chartiq-react-components/containers/AdvancedChart/resources'

const config = getCustomConfig()

config.lookupDriver = customSymbolLookup

<AdvancedChart config={config}/>
```

More information about [Lookup Drivers](https://documentation.chartiq.com/CIQ.ChartEngine.Driver.Lookup.html) can be found in the [data integration](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html#main) ChartIQ Documentation.
