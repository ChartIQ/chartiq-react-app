import React from 'react'
import { TimezoneDialog } from 'components'
import 'translations/translationSample'

export default class ChartTimezoneDialog extends React.Component {

	render () {
		return (
<cq-dialog>
	<cq-timezone-dialog>
		<h4 className="title">Choose Timezone</h4>
		<cq-close></cq-close>

		<p>To set your timezone use the location button below, or scroll through the following list...</p>
		<p className="currentUserTimeZone"></p>
    <div className="detect">
    <div className="ciq-btn" stxtap="removeTimezone()">Use My Current Location</div>
    </div>
    <div className="timezoneDialogWrapper" style={{maxHeight:"360px", overflow: "auto"}}>
	        <ul>
	          <li className="timezoneTemplate" style={{display:"none", cursor: "pointer"}}></li>
	        </ul>
        </div>
    <div className="instruct">(Scroll for more options)</div>
	</cq-timezone-dialog>
</cq-dialog>
		)
	}
}
