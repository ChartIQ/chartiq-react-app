import React, { useState } from "react"
import Chart, { CIQ } from "./ChartExample"

export { CIQ }

// Callback to execute when chart is loaded for first time
const onChartReady = (chartEngine) => {}

function getExampleConfig() {
	return {
		chartId: '_advancedChart',
		initialSymbol: {
			symbol: 'AAPL',
			name: 'Apple Inc',
			exchDisp: 'NASDAQ'
		},
		onChartReady
	}
}

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

export default function AdvancedExample (props) {
	const [ config ] = useState(() => {

		const config = getExampleConfig();
		CIQ.extend(config, props.config || {});

		return config;
	  });
	return (
		<Chart
			config={config}
			resources={props.resources}
			chartInitialized={props.chartInitialized}
		/>
	)
}
