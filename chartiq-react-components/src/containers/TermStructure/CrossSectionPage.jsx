import React from 'react'
import { default as TermStructure } from '../TermStructure'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const config = {}

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
export default function CrossSectionPage() {
	return(
		<TermStructure config={config} resources={{scrollStyle: PerfectScrollbar}} />
	)
}