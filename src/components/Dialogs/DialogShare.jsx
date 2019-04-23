import React from 'react'
import { ShareDialog } from 'components'

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

	render () {
		return (
<cq-dialog>
	<cq-share-dialog>
		<div>
			<h4 className="title">Share Your Chart</h4>
			<cq-separator></cq-separator>
			<cq-share-create className="ciq-btn" stxtap="share()">Create Image</cq-share-create>
			<cq-share-generating style={{display:"none"}}>Generating Image</cq-share-generating>
			<cq-share-uploading style={{display:"none"}}>Uploading Image</cq-share-uploading>

			<div className="share-link-div"></div>

			<cq-separator></cq-separator>
			<div className="ciq-dialog-cntrls">
				<div stxtap="close()" className="ciq-btn">Done</div>
			</div>

		</div>
	</cq-share-dialog>
</cq-dialog>
		)
	}
}
