import React from "react"
import { AdvancedChart } from "@chartiq/chartiq-react-components"
import { getCustomConfig } from "@chartiq/chartiq-react-components/containers/AdvancedChart/resources";

import quoteFeedSimulator from "chartiq/examples/feeds/quoteFeedSimulator";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
import marker from "chartiq/examples/markers/markersSample";

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({chartEngine, uiContext}) => {
	console.log(chartEngine)
	console.log(uiContext)
	// const CHARTIQ = stx.getCreatingLibrary()
	// Object.assign(window, {stx, CIQ: CHARTIQ.CIQ })
}

// Callback function for when the chartEngine is initialized but before loadChart has been called.
const onChartReady = () => {
	console.log("when the hell does this get called???")
}

const config = getCustomConfig({
	resources: {
		markerSample: marker.MarkersSample,
		quoteFeed: quoteFeedSimulator,
		scrollStyle: PerfectScrollbar
	},
	onChartReady
})

// ChartIQ example resources for markets and translations.
// Replace it with your own or feel free to use ours.

// Symbol mapping to market definition
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

// Translation file
import 'chartiq/examples/translations/translationSample';

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

export default class AdvancedChartPage extends React.Component {
	render() {
		return (
			<AdvancedChart 
				config={config}
				chartInitialized={chartInitialized}
			/>
		)
	}
}