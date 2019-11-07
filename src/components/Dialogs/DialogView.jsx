import React from 'react'

/**
 * View dialog component `<DialogView/>`
 * 
 * Displays dialog to enter custom view label.
 *
 * @export
 * @class DialogView
 * @extends {React.Component}
 */
export default class DialogView extends React.Component {
	render() {
		return (
<cq-dialog>
    <cq-view-dialog>
	    <h4>Save View</h4>
	    <div stxtap="close()" className="ciq-icon ciq-close"></div>
	    <div style={{textAlign: "center", marginTop:"10px"}}>
		    <i>Enter name of view:</i>
		    <p>
		    	<input spellCheck="false" autoCapitalize="off" autoCorrect="off" autoComplete="off" maxLength="40" placeholder="Name" /><br />
		    </p>
		    <span className="ciq-btn" stxtap="save()">Save</span>
		</div>
	</cq-view-dialog>
</cq-dialog>
		)
	}
}
