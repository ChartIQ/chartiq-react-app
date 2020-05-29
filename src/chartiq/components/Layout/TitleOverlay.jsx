import React from 'react';
import ChartTitle from '../Core/ChartTitle';
import ChartControlGroup from '../Features/ChartControlGroup';
import ChartComparison from '../Features/ChartComparison';
import MenuStudyLegend from '../Menus/MenuStudyLegend';
import { ChartContext } from '../../context/ChartContext';
import { CIQ } from 'chartiq/js/chartiq';

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
		const { stx } = this.context;
		this.listener = stx.addEventListener(
			'layout',
			this.updateOverlayPosition.bind(this)
		);
		this.updateOverlayPosition();
	}

	componentWillUnmount() {
		this.context.stx.removeEventListener(this.listener);
	}

	updateOverlayPosition() {
		const { top, left } = this.context.stx.chart.panel;
		this.setState({ position: { top, left } });
	}

	render() {
		const { top, left } = this.state.position;
		return (
			<div className="title-overlay-controls" style={{ top, left }}>
				<ChartTitle />
				{CIQ.FullScreen && <ChartControlGroup />}
				<ChartComparison />
				{!!Object.keys(this.context.stx.overlays).length && (
					<MenuStudyLegend
						clearAll={false}
						heading={'Overlays'}
						icon={true}
						only={'overlays'}
					/>
				)}
			</div>
		);
	}
}

TitleOverlay.contextType = ChartContext;
