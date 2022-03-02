import { default as Workstation, CIQ } from "./Workstation";
import tfcHtml from "chartiq/plugins/tfc/tfcHtml";

import { getConfig, getCustomConfig } from "./resources"; // ChartIQ library resources
import WorkstationExample from "./WorkstationExample";

export {
	Workstation as default,
	WorkstationExample,
	CIQ,
	getConfig,
	getCustomConfig,
	tfcHtml
};
