import React, { useState } from "react";
import Chart, { CIQ } from "./Core";

import quoteFeedSimulator from "chartiq/examples/feeds/quoteFeedSimulator";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
import EmojiPopover from "chartiq/js/thirdparty/emoji-popover.es.js";

import marker from "chartiq/examples/markers/markersSample";

export { CIQ };

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({ chartEngine, uiContext }) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, { stx: chartEngine, CIQ });
};

// Callback to execute when chart is loaded for first time
const onChartReady = (chartEngine) => {};

const exampleResources = {
	quoteFeed: quoteFeedSimulator,
	markerFeed: marker.MarkersSample,
	scrollStyle: PerfectScrollbar, // use improved component scrollbar appearance https://perfectscrollbar.com
	emojiPicker: EmojiPopover
};

function getExampleConfig() {
	return {
		chartId: "_coreChart",
		initialSymbol: {
			symbol: "AAPL",
			name: "Apple Inc",
			exchDisp: "NASDAQ"
		},
		onChartReady
	};
}

// ChartIQ example resources for markets and translations.
// Replace it with your own or feel free to use ours.

// Symbol mapping to market definition
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";
import "chartiq/examples/markets/timezones.js";

// Translation file
import "chartiq/examples/translations/translationSample";

// Example Marker files
// import "chartiq/examples/markers/tradeAnalyticsSample";
import "chartiq/examples/markers/videoSample";

// Plugins

// Crypto, L2 Heat Map, Market Depth,
// import "chartiq/plugins/activetrader/cryptoiq";

// ScriptIQ
// import "chartiq/plugins/scriptiq/scriptiq";

// SignalIQ
// import "chartiq/plugins/signaliq/signaliqDialog";
// import "chartiq/plugins/signaliq/signaliq-marker";
// import "chartiq/plugins/signaliq/signaliq-paintbar";

// TFC plugin
// Important: Uncomment tfc in config.plugins below when enabling this plug-in.
// import "chartiq/plugins/tfc/tfc-loader";
// import "chartiq/plugins/tfc/tfc-demo"; /* if using demo account class */

// Time Span Events
// import "chartiq/plugins/timespanevent/timespanevent";
// import "chartiq/plugins/timespanevent/examples/timeSpanEventSample"; /* if using sample */

// Trading Central: Technical Insights
// Important: Uncomment technicalInsights in config.plugins below when enabling this plug-in.
// import "chartiq/plugins/technicalinsights/components";

// Trading Central: Technical Views
// Important: Uncomment technicalViews in config.plugins below when enabling this plug-in.
// import "chartiq/plugins/technicalviews/components";

// Visual Earnings
// import "chartiq/plugins/visualearnings/visualearnings";

// Uncomment the following for the L2 simulator (required for the crypto sample and MarketDepth addOn)
// import "chartiq/examples/feeds/L2_simulator"; /* for use with cryptoiq */

export default function ChartExample(props) {
	const [{ config, resources }] = useState(() => {
		const config = getExampleConfig();

		/* Use dynamic load on demand as an alternative to static import */
		config.plugins = {
			// tfc: {
			// 	// use for dynamic plugin load
			//  // @ts-ignore // ignore since load isn't defined in ts definition
			// 	// load() {
			// 	//	return Promise.all([
			// 	//		import("chartiq/plugins/tfc/tfc-loader"),
			// 	//		import("chartiq/plugins/tfc/tfc-demo")
			// 	//	]);
			// 	// }
			// },
			// technicalInsights: {
			// 	// use for dynamic plugin load
			//  // @ts-ignore // ignore since load isn't defined in ts definition
			// 	// load() {
			// 	//	return import('chartiq/plugins/technicalinsights/components')
			// 	// }
			//	container: "",
			//	moduleName: "",
			//	lang: "en",
			//	channel: "",
			//	toggleMarkup: "",
			//	token: ""
			// },
			// technicalViews: {
			// 	// use for dynamic plugin load
			//  // @ts-ignore // ignore since load isn't defined in ts definition
			// 	// load() {
			// 	//	return import('chartiq/plugins/technicalviews/components')
			// 	// }
			//	container: "",
			//	moduleName: "",
			//	channel: "",
			//	toggleMarkup: "",
			//	partner: 0,
			//	token: ""
			// }
		}
		CIQ.extend(config, props.config || {});

		return { config, resources: { ...exampleResources, ...props.resources } };
	});
	const initialized = props.chartInitialized || chartInitialized;

	return (
		<Chart
			config={config}
			resources={resources}
			chartInitialized={initialized}
		>
			{props.children}
		</Chart>
	);
}


// Adjustments to compensate for when webpack config is not available
(function processCss() { // webpack processing can introduce extra 2 spaces for each translation line remove them here
	if (!CIQ.I18N.csv) return;
	const lines = CIQ.I18N.csv.split("\n");
	if (lines.length < 2) return console.warn(
		"Minification may have stripped out translation data. See 'Important Note Regarding Localization' in the react-components package ReadMe"
	);
	const translationHasExtraSpace = lines[1][0] === ' ';
	if (!translationHasExtraSpace) return;
	CIQ.I18N.csv = lines.map((line, i) => (i ? line.slice(2) : line)).join('\n')
})();
