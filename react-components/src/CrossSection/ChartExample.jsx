import React, { useState } from 'react'
import CrossSection,  { CIQ } from './Chart'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const exampleResources = { scrollStyle: PerfectScrollbar }

function getExampleConfig() {
	return {}
}

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({chartEngine, uiContext}) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, {stx: chartEngine, CIQ })
}
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

export default function ChartExample (props) {
	const [{ config, resources }] = useState(() => {

		const config = getExampleConfig();
		CIQ.extend(config, props.config || {});

		return { config, resources: { ...exampleResources, ...props.resources } };
	});
	const initialized = props.chartInitialized || chartInitialized;

	return(
		<CrossSection
			config={config}
			resources={resources}
			chartInitialized={initialized}
		/>
	)
}