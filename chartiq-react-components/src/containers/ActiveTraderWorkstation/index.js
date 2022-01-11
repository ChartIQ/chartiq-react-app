import React from "react";

import { default as ActiveTraderWorkstation, CIQ } from "./ActiveTraderWorkstation";
import tfcHtml from "chartiq/plugins/tfc/tfcHtml";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./ActiveTraderWorkstation.css";
import ActiveTraderPage from "./ActiveTraderPage";

export default function ({ chartInitialized, config,resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return (
		<ActiveTraderWorkstation
			config={configObj}
			chartInitialized={chartInitialized}
			tfcTemplate={tfcHtml}
		/>
	);
}

export { ActiveTraderPage, CIQ, getConfig, getCustomConfig, tfcHtml }