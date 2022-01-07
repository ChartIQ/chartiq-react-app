import React from 'react'
import { default as TermStructure, getCustomConfig } from '@chartiq/react-components/containers/TermStructure'

// Import sample shading or use your own
import "chartiq/plugins/crosssection/sample.css"

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

const config = getCustomConfig({resources: { scrollbars: PerfectScrollbar}})

import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

export default class CrossSectionPage extends React.Component {
	render() {
		return(
			<TermStructure config={config} />
		)
	}
}