import React, { useState } from "react";
import Workstation, { CIQ } from "./Workstation";

import quoteFeedSimulator from "chartiq/examples/feeds/quoteFeedSimulator";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";
import marker from "chartiq/examples/markers/markersSample";

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({ chartEngine, uiContext }) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, { stx: chartEngine, CIQ });
};

// Callback to execute when chart is loaded for first time
const onChartReady = (chartEngine) => {};

const exampleResources = {
	markerFeed: marker.MarkersSample,
	quoteFeed: quoteFeedSimulator,
	scrollStyle: PerfectScrollbar
};

function getExampleConfig() {
	return { onChartReady };
}

// ChartIQ example resources for markets and translations.
// Replace it with your own or feel free to use ours.

// Symbol mapping to market definition
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

// Translation file
import "chartiq/examples/translations/translationSample";

// Example Marker files
import "chartiq/examples/markers/videoSample";

// Import tfc-demo account
import "chartiq/plugins/tfc/tfc-demo";
import "chartiq/examples/feeds/L2_simulator"; /* for use with cryptoiq */

export default function WorkstationExample(props) {
	const [{ config, resources }] = useState(() => {
		const config = getExampleConfig();
		CIQ.extend(config, props.config);

		return { config, resources: { ...exampleResources, ...props.resources } };
	});
	const initialized = props.chartInitialized || chartInitialized;

	return (
		<Workstation
			config={config}
			resources={resources}
			chartInitialized={initialized}
		/>
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
