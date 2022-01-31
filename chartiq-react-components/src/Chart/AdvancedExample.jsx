import React from "react"
import Chart, { CIQ } from "./index"

import quoteFeedSimulator from "chartiq/examples/feeds/quoteFeedSimulator";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
import marker from "chartiq/examples/markers/markersSample";

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({chartEngine, uiContext}) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, {stx: chartEngine, CIQ })
}

// Callback function for when the chartEngine is initialized but before loadChart has been called.
const onChartReady = (chartEngine) => {
	// Ready do work with the chart!
}

const resources = {
	quoteFeed: quoteFeedSimulator,
	markerSample: marker.MarkersSample,
	scrollStyle: PerfectScrollbar
}

const config = {
	chartId: '_advancedChart',
	initialSymbol: {
		symbol: 'AAPL',
		name: 'Apple Inc',
		exchDisp: 'NASDAQ'
	},
	plugins: {}, // Activated Plugins go here!
	onChartReady
}

// ChartIQ example resources for markets and translations.
// Replace it with your own or feel free to use ours.

// Symbol mapping to market definition
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

// Translation file
import 'chartiq/examples/translations/translationSample';

// Example Marker files
import 'chartiq/examples/markers/tradeAnalyticsSample'
import 'chartiq/examples/markers/videoSample'

// Plugins

// Crypto, L2 Heat Map, Market Depth,
// Important: Uncomment marketDepth in config.plugins below when enabling this plug-in.
// import 'chartiq/plugins/activetrader/cryptoiq';

// ScriptIQ
// import 'chartiq/plugins/scriptiq/scriptiq';

// Trading Central: Technical Insights
// import 'chartiq/plugins/technicalinsights/components'

// TFC plugin
// Important: Uncomment tfc in config.plugins below when enabling this plug-in.
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';   /* if using demo account class */

// Time Span Events
// Important: Uncomment timeSpanEventPanel in config.plugins below when enabling this plug-in.
// import 'chartiq/plugins/timespanevent/timespanevent';
// import 'chartiq/plugins/timespanevent/examples/timeSpanEventSample';  /* if using sample */

// Trading Central: Analyst Views
// import 'chartiq/plugins/analystviews/components';

// Visual Earnings
// Important: Uncomment visualEarnings in config.plugins below when enabling this plug-in.
// import 'chartiq/plugins/visualearnings/visualearnings';

// Uncomment the following for the L2 simulator (required for the crypto sample and MarketDepth addOn)
// import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

export default function AdvancedChartPage (props) {
	const { config: conf = {} } = props;
	const configObj = CIQ.extend(config, conf);
	const sources = props.resources || resources
	const initialized = props.chartInitialized || chartInitialized;
	return (
		<Chart
			config={configObj}
			resources={sources}
			chartInitialized={initialized}
		/>
	)
}
