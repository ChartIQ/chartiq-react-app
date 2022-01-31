import React from 'react'
import { default as CrossSection } from '../CrossSection'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const config = {}
const resources = { scrollStyle: PerfectScrollbar }

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
	const {config: conf = {}, resources: sources = {} } = props;
	const configObj = CIQ.extend(config, conf)
	const initialized = props.chartInitialized || chartInitialized;
	return(
		<CrossSection
			config={configObj}
			resources={ sources || resources}
			chartInitialized={initialized}
		/>
	)
}