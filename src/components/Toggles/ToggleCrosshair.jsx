import React from 'react'

/**
 * Component that toggles crosshairs for the chart. `<ToggleCrosshair />`
 *
 * @export
 * @class ToggleCrossHair
 * @extends React.Component
 */
export default class ToggleCrosshair extends React.Component {

	render() {
		return(
			<cq-toggle class="ciq-CH" cq-member="crosshair">
				<span></span><cq-tooltip>Crosshair</cq-tooltip>
			</cq-toggle>
		)
	}
}