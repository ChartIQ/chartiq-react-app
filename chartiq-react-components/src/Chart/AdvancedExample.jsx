import React, { useState } from "react"
import Chart from "./ChartExample"

// Callback function for when the chartEngine is initialized but before loadChart has been called.
const onChartReady = (chartEngine) => {
	// Ready do work with the chart!
}
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

export default function AdvancedExample (props) {
	const {config = {}, resources = {}, chartInitialized } = props;
	const [configObj] = useState(() => CIQ.extend(getExampleConfig(), config));

	return (
		<Chart
			config={configObj}
			resources={resources}
			chartInitialized={chartInitialized}
		/>
	)
}
