import React from "react";

import { default as CrossSection, CIQ } from "./Chart";
import { getConfig, getCustomConfig } from "./resources";
import ChartPage from "./ChartPage";

/**
 * @name TermStructure
 * 
 * @export
 * @extends {React.Component}
 * @param {object} config Configuration used for the chart.
 * @param {object} resources Object of resources passed into configuration to be applied
 * @param {TermStructure~chartInitialized} chartInitialized Callback that fires when the chart is interactive
 * @return {TermStructure} 
 */
export default function ({ chartInitialized, config, resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return (
		<CrossSection config={configObj} chartInitialized={chartInitialized} />
	);
}

export { CIQ, getConfig, getCustomConfig, ChartPage }