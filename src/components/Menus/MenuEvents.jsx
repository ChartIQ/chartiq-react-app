import React from 'react'
import { Lookup, Menu, MenuDropDown, Scroll } from 'components'
import { ChartContext } from '../../react-chart-context'

/**
 * Chart menu component `<MenuEvents>`
 * 
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 * 
 * Dropdown menu of event marker display settings
 *
 * @export
 * @class MenuEvents
 * @extends {React.Component}
 */
export default class MenuEvents extends React.Component {
	activateMarker(target, type) {
		const chart = $$$('chartiq-chart')
		$$$(".stx-markers .ciq-active").classList.remove("ciq-active")
		target.classList.add("ciq-active")
		if (type == "helicopter") this.activateHelicopter()
		else if (type != "none") chart.showMarkers(type)
		else chart.hideMarkers()
	}

	activateHelicopter() {
		let helicopter = CIQ.UI.makeFromTemplate($$$("template.abstract"))[0]
		let chart = $$$('chartiq-chart')
		chart.hideMarkers()
		
		var marker=new CIQ.Marker({
			stx: this.context.stx,
			xPositioner:"none",
			yPositioner:"above_candle",
			label: "helicopter",
			permanent: true,
			chartContainer: true,
			node: helicopter
		});
		var leftPositition = this.context.stx.chart.width*0.4
		$$$('div.stx-marker.abstract').setAttribute('style', `z-index: 21; left: ${leftPositition}px`)
		this.context.stx.draw()
	}

	render () {
		return (
			<cq-menu class="ciq-menu stx-markers collapse">
				<span>Events</span>
				<cq-menu-dropdown>
					<cq-item className="square" onClick={(e) => this.activateMarker(e.target, 'square')}>Simple Square<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="circle" onClick={(e) => this.activateMarker(e.target, 'circle')}>Simple Circle<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="callout" onClick={(e) => this.activateMarker(e.target, 'callout')}>Callouts<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="abstract" onClick={(e) => this.activateMarker(e.target, 'helicopter')}>Abstract<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="none"onClick={(e) => this.activateMarker(e.target, 'none')}>None<span className="ciq-radio ciq-active"><span></span></span>
					</cq-item>
				</cq-menu-dropdown>
			</cq-menu>
		)
	}
}

MenuEvents.contextType = ChartContext
