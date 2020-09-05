import React from "react";

import { default as AdvancedChart } from "./AdvancedChart";

import { config } from "./resources"; // ChartIQ library resources
import "./AdvancedChart.css";

export default function ({ chartInitialized }) {
	return <AdvancedChart config={config} chartInitialized={chartInitialized} />;
}
