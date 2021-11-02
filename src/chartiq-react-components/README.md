# ChartIQ React Components

## Overview

The ChartIQ React Components is a React component library featuring several advanced components that can be easily imported into an existing React application.

A copy of the ChartIQ library, version 8.3.0 or later.

If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

**NOTE** While you can install the React components, they do require the ChartIQ library to work. If you do not have a copy of the library you may evaluate one from [here](https://cosaic.io/chartiq-sdk-library-download/).

## Getting Started

After installing this package into your React project you will need to install the ChartIQ library (included separately).

```js
npm install chartiq-8.3.0 // or whatever version you are using!
```

You can then import one of the included components into your React app:

```jsx
<Route path='/technical-analysis'
	render={() => (
		<AdvancedChart
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
- CustomChart &mdash; Integrates native React components with ChartIQ W3C-standard web components.
