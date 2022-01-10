import React, { useState } from "react";

import { default as AdvancedChart, CIQ } from "./AdvancedChart";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./AdvancedChart.css";
import AdvancedChartPage from "./AdvancedChartPage"

export default function ({ chartInitialized, config, symbol, chartId, resources }) {
	// Make a copy so we can preserve original config props
	const configCopy = Object.assign({}, config);

	const [configObj] = useState(CIQ.extend(configCopy, getCustomConfig({ symbol, chartId, resources })));

	return <AdvancedChart config={configObj} chartInitialized={chartInitialized} />;
}

export { AdvancedChartPage, CIQ, getConfig, getCustomConfig }