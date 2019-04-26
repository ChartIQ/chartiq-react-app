import React from 'react'
import ChartTitle from '../Core/ChartTitle'
import ChartComparison from '../Features/ChartComparison'
import MenuStudyLegend from '../Menus/MenuStudyLegend'
import { ChartContext } from '../../react-chart-context'

/**
 * Presentational component that holds the ChartTitle and other components. This component is designed to keep the ChartTitle in the same position with the top of the main chart panel.
 * 
 * @export 
 * @class TitleOverlay
 * @extends React.Component
 */
export default class TitleOverlay extends React.Component {

	componentDidMount() {
		let stx = this.context.stx
		this.listener = stx.addEventListener("layout", function() {
			$$$('.title-overlay-controls').style.top = stx.chart.panel.top + "px"
		})
	}

	componentWillUnmount() {
		let stx = this.context.stx
		stx.removeEventListener(this.listener)
	}

	render() {
		let initialTop = this.context.stx.chart.panel.top+'px'
		return(
			<div className="title-overlay-controls" style={{top: initialTop}}>
				<ChartTitle />
				<ChartComparison />
				<MenuStudyLegend clearAll={false
				} heading={"Overlays"} icon={true} only={"overlays"} />
			</div>
		)
	}
}

TitleOverlay.contextType = ChartContext; 