import React from "react";

import { default as TermStructure, CIQ } from "./TermStructure";
import { getConfig, getCustomConfig } from "./resources";
import TermStructurePage from "./CrossSectionPage";

export default function ({ chartInitialized, config, resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return (
		<TermStructure config={configObj} chartInitialized={chartInitialized} />
	);
}

export { CIQ, getConfig, getCustomConfig, TermStructurePage }