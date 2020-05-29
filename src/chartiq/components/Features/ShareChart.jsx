import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';

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
		// take a moment before loading html2canvas library to reduce resource request congestion
		// at application startup as sharing is not likely to be first item used so delay would be acceptable
		// with additional UI elements, this could also be implemented using on demand loading
		const msToDelayLoading = 1000;
		setTimeout(() => {
			import(
				/* webpackChunkName: "html2canvas" */ 'chartiq/js/thirdparty/html2canvas.min.js'
			)
				.then(html2canvas => {
					CIQ.Share.html2canvasLocation = 'dist';
					window.html2canvas = html2canvas.default;
				})
				.catch(err =>
					console.error('Error: failed to load html2canvas for screen sharing')
				);
		}, msToDelayLoading);
	}

	render() {
		return (
			<cq-share-button>
				<div stxtap="tap();">Share</div>
			</cq-share-button>
		);
	}
}
