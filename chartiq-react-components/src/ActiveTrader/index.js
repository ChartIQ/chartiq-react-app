import React from "react";

import { default as Workstation, CIQ } from "./Workstation";
import tfcHtml from "chartiq/plugins/tfc/tfcHtml";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import "./Workstation.css";
import WorkstationExample from "./WorkstationExample";

export default function ({ chartInitialized, config,resources }) {
	const configObj = getCustomConfig({ resources });
	CIQ.extend(configObj, config);

	return (
		<Workstation
			config={configObj}
			chartInitialized={chartInitialized}
			tfcTemplate={tfcHtml}
		/>
	);
}

export { WorkstationExample, CIQ, getConfig, getCustomConfig, tfcHtml }