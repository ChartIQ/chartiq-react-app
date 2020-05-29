import React from 'react'

/**
 * Aggregation dialog component `<DialogAggregation/>`
 * 
 * Displays dialog to enter custom aggregation values.
 *
 * @export
 * @class DialogAggregation
 * @extends {React.Component}
 */
export default class DialogAggregation extends React.Component {
	render() {
		return(
<cq-dialog>
	<cq-aggregation-dialog>
		<h4 className="title">_</h4>
		<div stxtap="hide()" className="ciq-icon ciq-close"></div>
		<div style={{textAlign:"center", marginTop:"10px"}}>
			<div className="ciqkagi">
				<i>Enter value and hit "Enter"</i>
				<p>
				<input name="kagi" stxtap="Layout.setAggregationEdit('kagi')" />
				</p>
			</div>
			<div className="ciqrenko">
				<i>Enter value and hit "Enter"</i>
				<p>
				<input name="renko" stxtap="Layout.setAggregationEdit('renko')" />
				</p>
			</div>
			<div className="ciqlinebreak">
				<i>Enter value and hit "Enter"</i>
				<p>
				<input name="priceLines" stxtap="Layout.setAggregationEdit('priceLines')" />
				</p>
			</div>
			<div className="ciqrangebars">
				<i>Enter value and hit "Enter"</i>
				<p>
				<input name="range" stxtap="Layout.setAggregationEdit('rangebars')" />
				</p>
			</div>
			<div className="ciqpandf">
				<i>Enter box size and hit "Enter"</i>
				<p>
				<input name="box" stxtap="Layout.setAggregationEdit('pandf.box')" />
				</p>
				<i>Enter reversal and hit "Enter"</i>
				<p>
				<input name="reversal" stxtap="Layout.setAggregationEdit('pandf.reversal')" />
				</p>
			</div>
			<p>or</p>
			<div className="ciq-btn" stxtap="Layout.setAggregationEdit('auto')">Auto Select</div>
		</div>
	</cq-aggregation-dialog>
</cq-dialog>
		)
	}
}
