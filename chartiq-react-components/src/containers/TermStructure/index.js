import React from "react";

import { default as TermStructure, CIQ } from "./TermStructure";
import { getConfig, getCustomConfig } from "./resources";
import TermStructurePage from "./CrossSectionPage";

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
		<TermStructure config={configObj} chartInitialized={chartInitialized} />
	);
}

export { CIQ, getConfig, getCustomConfig, TermStructurePage }