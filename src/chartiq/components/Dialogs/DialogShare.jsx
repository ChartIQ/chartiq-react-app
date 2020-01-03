import React from 'react';

/**
 * Share dialog component `<DialogShare/>`
 *
 * Displays dialog to render and download a static image of the chart for sharing.
 *
 * @export
 * @class DialogShare
 * @extends {React.Component}
 */
export default class DialogShare extends React.Component {
	render() {
		return (
			<cq-dialog>
				<cq-share-dialog>
					<h4 className="title">Share Your Chart</h4>
					<cq-close></cq-close>
					<div cq-share-dialog-div="true">
						<cq-separator></cq-separator>
						<cq-share-create class="ciq-btn" stxtap="share()">
							Create Image
						</cq-share-create>
						<cq-share-generating>Generating Image</cq-share-generating>
						<cq-share-uploading>Uploading Image</cq-share-uploading>
						<div className="share-link-div"></div>
						<cq-share-copy class="ciq-btn" stxtap="copy()">
							Copy Link to Clipboard
						</cq-share-copy>
						<cq-share-copied>Link Copied!</cq-share-copied>
					</div>
				</cq-share-dialog>
			</cq-dialog>
		);
	}
}
