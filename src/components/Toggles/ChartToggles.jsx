import React from 'react'
import ToggleCrosshair from './ToggleCrosshair'
import ToggleDrawing from './ToggleDrawing'
import { ChartContext } from '../../react-chart-context'
import { Toggle } from 'components'
import ToggleHUD from './ToggleHUD'

/**
 * Component that holds other toggle components. `<ChartToggles />`
 *
 * Also contains a toggle for displaying toggles in sidenav for mobile
 *
 * @export
 * @class ChartToggles
 * @extends React.Component
 */
export default class ChartToggles extends React.Component {

	render () {
		const hud = this.context.UIContext.UIHeadsUpStatic && <ToggleHUD />
		return (
			<>
		<div className="sidenav-toggle ciq-toggles">
			<cq-toggle class="ciq-sidenav" cq-member="sidenav" cq-toggles="sidenavOn,sidenavOff"><span></span>
				<cq-tooltip>More</cq-tooltip>
			</cq-toggle>
		</div>

		<div className="icon-toggles ciq-toggles">
			<ToggleCrosshair />
			{ hud }
			<ToggleDrawing />
		</div>
		</>
		)
	}
}

ChartToggles.contextType = ChartContext; 
