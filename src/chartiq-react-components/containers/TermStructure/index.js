import React, { useState } from "react";

import { default as TermStructure, CIQ } from "./TermStructure";
import { getConfig, getCustomConfig } from "./resources";

export default function ({ chartInitialized, config, symbol, chartID }) {
	const [configObj] = useState(config || getCustomConfig({ symbol, chartID }));

	return (
		<TermStructure config={configObj} chartInitialized={chartInitialized} />
	);
}

export { CIQ, getConfig, getCustomConfig }