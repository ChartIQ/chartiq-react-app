import React, { useState } from "react";

import { default as CrossSection } from "./CrossSection";
import { getCustomConfig } from "./resources";
// import './CrossSection.css';

export default function ({ chartInitialized, config, symbol, chartID }) {
	const [configObj] = useState(config || getCustomConfig({ symbol, chartID }));

	return (
		<CrossSection config={configObj} chartInitialized={chartInitialized} />
	);
}
