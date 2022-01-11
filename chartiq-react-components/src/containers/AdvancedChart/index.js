import React from "react";

import { default as AdvancedChart, CIQ } from "./AdvancedChart";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./AdvancedChart.css";
import AdvancedChartPage from "./AdvancedChartPage"

export default function ({ chartInitialized, config, resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return <AdvancedChart config={configObj} chartInitialized={chartInitialized} />;
}

export { AdvancedChartPage, CIQ, getConfig, getCustomConfig }