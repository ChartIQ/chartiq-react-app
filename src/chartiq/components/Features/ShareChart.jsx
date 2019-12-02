import React from 'react'
import { CIQ } from 'chartiq'
import * as html2canvas from 'chartiq/js/thirdparty/html2canvas'

/**
 * Share chart button component `<ShareChart/>`
 * 
 * Button to activate the share dialog in {@link DialogShare}
 *
 * @export
 * @class ShareChart
 * @extends {React.Component}
 */
export default class ShareChart extends React.Component {
	render() {
		CIQ.Share.html2canvasLocation = 'dist'
		// CIQ expects html2canvas on the global
		window.html2canvas = html2canvas
		return (
			<>
			<cq-share-button>
				<cq-clickable cq-selector="cq-share-dialog" cq-method="open">Share</cq-clickable>
			</cq-share-button>
			</>
		)
	}
}
