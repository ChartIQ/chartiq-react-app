import React from "react";

import { default as AdvancedChart, CIQ } from "./Chart";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./Chart.css";
import ChartPage from "./ChartPage"

export default function ({ chartInitialized, config, resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return <AdvancedChart config={configObj} chartInitialized={chartInitialized} />;
}

export { ChartPage, CIQ, getConfig, getCustomConfig }