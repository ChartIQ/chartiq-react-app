import React from "react"
import Workstation,{ CIQ } from "../ActiveTrader";

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
	markerSample: marker.MarkersSample,
	quoteFeed: quoteFeedSimulator,
	scrollStyle: PerfectScrollbar
}

const config = {
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
import 'chartiq/examples/markers/videoSample'

// Import tfc-demo account
import 'chartiq/plugins/tfc/tfc-demo';
import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

export default function (props) {
	const {config: conf = {}, resources: sources = {} } = props;
	const configObj = CIQ.extend(config, conf)
	const initialized = props.chartInitialized || chartInitialized
	return(
		<Workstation
			config={configObj}
			resources={sources || resources}
			chartInitialized={initialized}
		/>
	)
}