import React from 'react';
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart toggle for turningg on
 */
export default class ToggleDrawing extends React.Component {
	constructor() {
		super();
		this.toggle = React.createRef();
	}

	componentDidMount() {
		const { setContext, stx, stx: { container: chartContainer }} = this.context;

		this.toggle.current.registerCallback(function(value) {
			setContext({ drawingActive: value });
			chartContainer.setHeight();

			// Sync up the internal state between all drawing toggle web components
			var drawingToggles=document.querySelectorAll(".ciq-draw");
			for(var drawToggleIdx=0; drawToggleIdx<drawingToggles.length; drawToggleIdx++){
				// Setting currentValue directly so the callback isn't triggered
				drawingToggles[drawToggleIdx].currentValue = value;
			}

			// remember what the previous drawing tool was
			// and re-enable it when the toolbar is reopened
			if (value) {
				stx.changeVectorType(this.priorVectorType);
			} else {
				this.priorVectorType = stx.currentVectorParameters.vectorType;
				stx.changeVectorType('');
			}
		});
	}

	render() {
		const { drawingActive } = this.context;
		return (
			<cq-toggle class={`ciq-draw ${drawingActive ? 'active' : ''}`} ref={this.toggle}>
				<span></span>
				<cq-tooltip>Draw</cq-tooltip>
			</cq-toggle>
		);
	}
}

ToggleDrawing.contextType = ChartContext;