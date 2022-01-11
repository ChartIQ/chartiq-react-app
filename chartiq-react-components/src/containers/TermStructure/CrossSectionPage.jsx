import React from 'react'
import { default as TermStructure, getCustomConfig } from '../TermStructure'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const config = {
	// initialSymbol: 'US-B Benchmark'
}

import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

export default function CrossSectionPage() {
	return(
		<TermStructure config={config} resources={{scrollStyle: PerfectScrollbar}} />
	)
}