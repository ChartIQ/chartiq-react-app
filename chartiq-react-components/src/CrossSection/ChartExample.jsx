import React from 'react'
import { default as CrossSection } from '../CrossSection'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const config = {}
const resources = { scrollStyle: PerfectScrollbar }

// Callback function where you can access both the chartEngine and the UIContext.
const chartInitialized = ({chartEngine, uiContext}) => {
	// Assign stx and CIQ to window for development convenience
	Object.assign(window, {stx: chartEngine, CIQ })
}
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

/**
 * @name TermStructurePage React Functional component
 * @function
 * @export
 * @prop {object} config Chart configuration
 * @prop {object} resources
 * @prop {function} chartInitialized
 */
export default function CrossSectionPage(props) {
	const {config: conf = {} } = props;
	const configObj = CIQ.extend(config, conf);
	const sources = props.resources || resources;
	const initialized = props.chartInitialized || chartInitialized;
	return(
		<CrossSection
			config={configObj}
			resources={sources}
			chartInitialized={initialized}
		/>
	)
}