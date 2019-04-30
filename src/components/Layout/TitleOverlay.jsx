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

	constructor(){
		super();
		this.state = {
			position: {
				top: 0,
				left: 0
			}
		}
	}

	componentDidMount() {
		let stx = this.context.stx;
		this.listener = stx.addEventListener("layout", this.UpdateOverlayPosition.bind(this))
		this.UpdateOverlayPosition();
	}

	componentWillUnmount() {
		let stx = this.context.stx
		stx.removeEventListener(this.listener)
	}

	UpdateOverlayPosition(){
		this.setState({
			position: {
				top: this.context.stx.chart.panel.top,
				left: this.context.stx.chart.panel.left
			}
		});
	}

	render() {
		return(
			<div className="title-overlay-controls" style={{top: this.state.position.top+'px', left: this.state.position.left+'px'}}>
				<ChartTitle />
				<ChartComparison />
				<MenuStudyLegend clearAll={false
				} heading={"Overlays"} icon={true} only={"overlays"} />
			</div>
		)
	}
}

TitleOverlay.contextType = ChartContext; 