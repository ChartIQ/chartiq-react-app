import React from "react";

import { default as CoreChart, CIQ } from "./Chart";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import ChartPage from "./ChartPage"

export default function ({ chartInitialized, config, resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return <CoreChart config={configObj} chartInitialized={chartInitialized} />;
}

export { ChartPage, CIQ, getConfig, getCustomConfig }