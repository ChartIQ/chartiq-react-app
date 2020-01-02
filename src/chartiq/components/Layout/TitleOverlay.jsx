import React from 'react';
import ChartTitle from '../Core/ChartTitle';
import ChartControlGroup from '../Features/ChartControlGroup';
import ChartComparison from '../Features/ChartComparison';
import MenuStudyLegend from '../Menus/MenuStudyLegend';
import { ChartContext } from '../../context/ChartContext';
import { CIQ } from 'chartiq';

/**
 * Presentational component that holds the ChartTitle and other components. This component is designed to keep the ChartTitle in the same position with the top of the main chart panel.
 *
 * @export
 * @class TitleOverlay
 * @extends React.Component
 */
export default class TitleOverlay extends React.Component {
	constructor() {
		super();
		this.state = {
			position: {
				top: 0,
				left: 0
			}
		};
	}

	componentDidMount() {
		let stx = this.context.stx;
		this.listener = stx.addEventListener(
			'layout',
			this.UpdateOverlayPosition.bind(this)
		);
		this.UpdateOverlayPosition();
	}

	componentWillUnmount() {
		let stx = this.context.stx;
		stx.removeEventListener(this.listener);
	}

	UpdateOverlayPosition() {
		this.setState({
			position: {
				top: this.context.stx.chart.panel.top,
				left: this.context.stx.chart.panel.left
			}
		});
	}

	render() {
		let menuStudyLegend;
		if (Object.keys(this.context.stx.overlays).length > 0) {
			// Only render the <MenuStudyLegend.../> component if there are overlay studies present in the chart
			menuStudyLegend = (
				<MenuStudyLegend
					clearAll={false}
					heading={'Overlays'}
					icon={true}
					only={'overlays'}
				/>
			);
		}
		return (
			<div
				className="title-overlay-controls"
				style={{
					top: this.state.position.top + 'px',
					left: this.state.position.left + 'px'
				}}
			>
				<ChartTitle />
				{CIQ.FullScreen && <ChartControlGroup />}
				<ChartComparison />
				{menuStudyLegend}
			</div>
		);
	}
}

TitleOverlay.contextType = ChartContext;
