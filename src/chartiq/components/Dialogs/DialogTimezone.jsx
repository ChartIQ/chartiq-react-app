import React from 'react'
import 'chartiq/examples/translations/translationSample'

/**
 * Timezone dialog component `<DialogTimezone/>`
 * 
 * Displays dialog with options to select local time zone.
 *
 * @export
 * @class DialogTimezone
 * @extends {React.Component}
 */
export default class DialogTimezone extends React.Component {

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
