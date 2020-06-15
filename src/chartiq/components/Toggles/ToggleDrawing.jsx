import React from 'react';
import { ChartContext } from '../../context/ChartContext';
import { CIQ } from 'chartiq/js/componentUI';
/**
 * Chart toggle for turningg on
 */
export default class ToggleDrawing extends React.Component {
	constructor() {
		super();
		this.toggle = React.createRef();
	}

	componentDidMount() {
		const {
			setContext,
			stx,
			stx: { container: chartContainer },
			UIContext
		} = this.context;
		
		let priorVectorType = '';

		CIQ.UI.BaseComponent.prototype.channelSubscribe(
			'channel.drawing', 
			value => setToggle(value),
			stx
		);

		function setToggle(value) {
			setContext({ drawingActive: value });
			chartContainer.setHeight();

			if (value) {
				// enable previous drawing tool
				if (priorVectorType) stx.changeVectorType(priorVectorType);
			} else {
				stx.changeVectorType('');
				// delay setting prior vector type to prevent multiple toggles writing different values
				setTimeout(() => priorVectorType = stx.currentVectorParameters.vectorType)
			}
			if (UIContext && UIContext.PaletteDock) UIContext.PaletteDock.setChartDimensions();
			stx.resizeChart();
		};
	}

	render() {
		const { drawingActive } = this.context;
		return (
			<cq-toggle cq-member="channel.drawing" 
				class={`ciq-draw ${drawingActive ? 'active' : ''}`}
				ref={this.toggle}
			>
				<span></span>
				<cq-tooltip>Draw</cq-tooltip>
			</cq-toggle>
		);
	}
}

ToggleDrawing.contextType = ChartContext;
