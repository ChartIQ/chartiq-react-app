import React from 'react'
import { CIQ } from 'chartiq'

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
	componentDidMount() {
		// take a bit time to load canvas allowing other items load
		// with additonal UI notificatio this could also be implemented with on demand loading
		setTimeout(() => {
			import(/* webpackChunkName: "html2canvas" */ 'chartiq/js/thirdparty/html2canvas')
			.then(html2canvas => {
				CIQ.Share.html2canvasLocation = 'dist'
				window.html2canvas = html2canvas;
			})
			.catch(err => console.error('Error: failed to load html2canvas for screen sharing'))
		}, 1000);  
	}

	render() {
		return (
			<>
			<cq-share-button>
				<cq-clickable cq-selector="cq-share-dialog" cq-method="open">Share</cq-clickable>
			</cq-share-button>
			</>
		)
	}
}
