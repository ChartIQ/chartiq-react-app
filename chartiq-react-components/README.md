# ChartIQ React Components

## Overview

The ChartIQ React Components is a React component library featuring several advanced components that can be easily imported into an existing React application.

A copy of the ChartIQ library, version 8.4.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

**NOTE** While you can install the React components, they do require the ChartIQ library to work. If you do not have a copy of the library you may evaluate one from [here](https://cosaic.io/chartiq-sdk-library-download/).

## Included Components

The exported components include:

- Chart &mdash; Core chart component with everythng needed to get started for financial time series charts.
- AdvancedChart &mdash; Full featured advanced chart component with everything needed for technical analysis.
- ActiveTrader &mdash; Sets up an information-rich component ready for traders.
- CrossSection &mdash; Creates a working CrossSection (previously TermStructure) component for dealing with non&ndash;time series data.

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

### Customizing the chart config

All components accept a config prop which can be modified to enable varuios features, set chart properties, load data and more (for full documentation see [ChartIQ Default Chart Configuration](https://documentation.chartiq.com/tutorial-Chart%20Configuration.html)).

By default you may pass in only the the parts of the config you want to customize and these changes will be merged onto the the default configuration. For example to create a chart with a custom initial symbol you can do:

```jsx
import Chart from @chartiq/react-components
const config = { initialSymbol: 'FB' }

export default function MyChart() {
	return (
		<Chart config={config} />
	)
}
```


### Adding your own quotefeed

By default all components will load the quoteFeedSimulator so that you have some working data to get started with. When you are ready to add your own quotefeed, it should be aded to the config prop passed into the chart component.

After importing your own quotefeed, and getting a config to pass into the chart, assign your quotefeeed to the config and  pass it to the component as a prop.

```jsx
import MyCustomQuotefeed from './myCustomQuotefeed'
import { getCustomConfig } from '@chartiq/react-components/containers/AdvancedChart/resources'

const config = getCustomConfig({ resources: { quoteFeed: myCustomQuoteFeed }})

<AdvancedChart config={config}/>
```

### Customizing Component Template

Every component accepts children that it will render instead of its default JSX template. 
### Adding your own LookupDriver

The chart configuration includes the default Lookup.ChartIQ implementation but you can substitute your own lookup driver to power symbol searches. After getting a config object you can assign a custom lookup.

```jsx
import Chart from '@chartiq/react-components'
import customSymbolLookup from './myCustomSymbolLookup'

const config { lookupDriver: customSymbolLookup }

<Chart config={config}/>
```

More information about [Lookup Drivers](https://documentation.chartiq.com/CIQ.ChartEngine.Driver.Lookup.html) can be found in the [data integration](https://documentation.chartiq.com/tutorial-DataIntegrationQuoteFeeds.html#main) ChartIQ Documentation.
