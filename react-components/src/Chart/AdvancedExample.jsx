import React, { useState } from "react"
import Chart, { CIQ } from "./ChartExample"

export { CIQ }

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
