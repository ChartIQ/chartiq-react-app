import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import 'chartiq/js/components';

import '../../webcomponent-containers/chart-container';

import TitleOverlay from '../Layout/TitleOverlay';
import LoadingWidget from './LoadingWidget';
import {
	PaletteDrawing,
	HeadsUpStatic,
	HeadsUpDynamic,
	MarkerAbstract,
	DataAttribution
} from '../Features/';

import { ChartContext } from '../../context/ChartContext';

/**
 * Wrapped chart component `<WrappedChart/>`.
 *
 * Renders ChartIQ chart canvas and associated DOM elements. The wrapped chart itself has no user interface. You may
 * use the provided components to add user controls suitable to your project. See components `<BasicChart>` or
 * `<AdvancedChart>` in this project for reference.
 *
 * @export
 * @class WrappedChart
 * @extends {React.Component}
 */

export default class WrappedChart extends React.Component {
	constructor(props) {
		super(props);

		this.engineRef = React.createRef();
		this.orderbookRef = React.createRef();
	}

	componentDidMount() {
		this.createChartAndUI(this.engineRef.current);
	}

	createChartAndUI(container) {
		const {
			chartConfig,
			addOns,
			quoteFeed,
			quoteFeedBehavior,
			marketFactory
		} = this.props;

		const stx = new CIQ.ChartEngine({ container, ...chartConfig });

		// provides chart engine reference to React context
		this.context.setChartEngine(stx);

		// ciq webcomponents require reference to stxx and CIQ in chart container node
		container.stxx = stx;
		container.CIQ = CIQ;

		// ciq webcomponent initialization chart and connecting to quote feed
		// attaches chart engine stx to UIContext
		container.startChartUI({
			stx,
			quoteFeed,
			quoteFeedBehavior,
			addOns,
			marketFactory
		});

		// If in development allow access to globals for easy debugging
		if (process.env.NODE_ENV !== 'production') {
			if (!window.cq_debug) {
				window.cq_debug = {
					CIQ: CIQ,
					stx
				};
			} else window.cq_debug.stx = stx;
		}
		return stx;
	}

	render() {
		const { stx, drawingActive } = this.context;
		const { headsUpDisplayTypes } = this.props;
		const dynamicHeadsUp = headsUpDisplayTypes.includes('dynamic');
		const staticHeadsUp = headsUpDisplayTypes.includes('static');

		return (
			<>
				<div className={`ciq-chart ${drawingActive ? 'toolbar-on' : ''}`}>
					{stx && (
						<>
							<PaletteDrawing />
							<MarkerAbstract />
						</>
					)}
					<chartiq-chart-container
						class="chartContainer"
						defer-start="true"
						ref={this.engineRef}
						toolbar-active={drawingActive ? true : false}
					>
						{stx && <TitleOverlay refProp={this.engineRef} />}
						<LoadingWidget />
						{dynamicHeadsUp && stx && <HeadsUpDynamic />}
						{staticHeadsUp && stx && <HeadsUpStatic />}
						{this.props.children}
					</chartiq-chart-container>
					<DataAttribution />
				</div>
			</>
		);
	}
}

WrappedChart.contextType = ChartContext;
