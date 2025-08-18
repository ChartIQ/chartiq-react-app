import React, { useState } from "react";
import Chart, { CIQ } from "./MultiChartExample";

import quoteFeedSimulator from "chartiq/examples/feeds/quoteFeedSimulator";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
// use for SignalIQ
// import EmojiPopover from "chartiq/js/thirdparty/emoji-popover.es.js";
import marker from "chartiq/examples/markers/markersSample";

// ChartIQ example resources for markets and translations.
// Replace it with your own or feel free to use ours.

// Symbol mapping to market definition
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";
import "chartiq/examples/markets/timezones.js";

// Translation file
import "chartiq/examples/translations/translationSample";

// Example Marker files
//import "chartiq/examples/markers/tradeAnalyticsSample";
import "chartiq/examples/markers/videoSample";






// Enable advanced features
// import "chartiq/js/advanced";

// Plugins

// Crypto, L2 Heat Map, Market Depth,
// import "chartiq/plugins/activetrader/cryptoiq";

// SignalIQ
// import "chartiq/plugins/signaliq/signaliqDialog";
// import "chartiq/plugins/signaliq/signaliq-marker";
// import "chartiq/plugins/signaliq/signaliq-paintbar";

// import "chartiq/plugins/studybrowser";

// TFC plugin
// Important: Uncomment tfc in config.plugins below when enabling this plug-in.
// import "chartiq/plugins/tfc/tfc-loader";
// import "chartiq/plugins/tfc/tfc-demo"; /* if using demo account class */


// Uncomment the following for the L2 simulator (required for the crypto sample and MarketDepth addOn)
// import "chartiq/examples/feeds/L2_simulator"; /* for use with cryptoiq */

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({ chartContainer }) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, { chartContainer });
	// list active charts
	// console.log(chartContainer.charts);
};

// Callback to execute when chart is loaded for first time
const onChartReady = (chartEngine) => {
	// Simulate L2 data
	// Requires import of cryptoiq and L2_simulator
	// In your implementation, you must instead load L2 data
	// using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
	// CIQ.simulateL2({ stx: chartEngine, onInterval: 1300, onTrade: true });
};

const exampleResources = {
	quoteFeed: quoteFeedSimulator,
	markerFeed: marker.MarkersSample,
	scrollStyle: PerfectScrollbar, // use improved component scrollbar appearance https://perfectscrollbar.com
	// emojiPicker: EmojiPopover // use for SignalIQ
};

function getExampleConfig() {
	return {
		chartId: "_multiChartExample",
		onChartReady,
		addOns: {
			tableView: { coverContainer: ".ciq-multi-chart-container-wrapper" }
		}
	};
}

export default function ChartExample(props) {
	const [{ config, resources }] = useState(() => {
		const config = getExampleConfig();
		CIQ.extend(config, props.config || {});

		return { config, resources: { ...exampleResources, ...props.resources } };
	});
	const initialized = props.chartInitialized || chartInitialized;

	return (
		<Chart
			config={config}
			resources={resources}
			chartInitialized={initialized}
			chartEntries={[{ symbol: "TSLA" }, { symbol: "AAPL" }]}
		>
			{props.children}
		</Chart>
	);
}


// Adjustments to compensate for when webpack config is not available
(function processCss() { // webpack processing can introduce extra 2 spaces for each translation line remove them here
	if (!CIQ.I18N.csv) return;
	const lines = CIQ.I18N.csv.split("\n");
	const translationHasExtraSpace = lines[1][0] === ' ';
	if (!translationHasExtraSpace) return;
	CIQ.I18N.csv = lines.map((line, i) => (i ? line.slice(2) : line)).join('\n')
})();
