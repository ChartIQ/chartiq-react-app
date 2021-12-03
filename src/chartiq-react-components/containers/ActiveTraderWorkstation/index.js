import React, { useState } from "react";

import { default as ActiveTraderWorkstation, CIQ } from "./ActiveTraderWorkstation";
import tfcHtml from "chartiq/plugins/tfc/tfcHtml";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./ActiveTraderWorkstation.css";

export default function ({ chartInitialized, config, symbol, chartId }) {
	const [configObj] = useState(config || getCustomConfig({ symbol, chartId }));

	return (
		<ActiveTraderWorkstation
			config={configObj}
			chartInitialized={chartInitialized}
			tfcTemplate={tfcHtml}
		/>
	);
}

export { CIQ, getConfig, getCustomConfig, tfcHtml }