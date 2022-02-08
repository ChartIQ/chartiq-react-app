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
