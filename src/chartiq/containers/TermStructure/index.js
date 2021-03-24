import React, { useState } from "react";

import { default as TermStructure } from "./TermStructure";
import { getCustomConfig } from "./resources";
// import './CrossSection.css';

export default function ({ chartInitialized, config, symbol, chartID }) {
	const [configObj] = useState(config || getCustomConfig({ symbol, chartID }));

	return (
		<TermStructure config={configObj} chartInitialized={chartInitialized} />
	);
}
