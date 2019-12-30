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
			if (value) {
				//this.classList.add('active');
				chart.setAttribute('toolbar-active', true);
				ciqChart.classList.add('toolbar-on');
			} else {
				//this.classList.remove('active');
				chart.setAttribute('toolbar-active', false);
				ciqChart.classList.remove('toolbar-on');
			}
			var drawingToggles=document.querySelectorAll(".ciq-draw");
			for(var drawToggleIdx=0; drawToggleIdx<drawingToggles.length; drawToggleIdx++){
				// Setting currentValue directly so the callback isn't triggered
				drawingToggles[drawToggleIdx].currentValue = value;
				// Update the toggle's active class
				if(value){
					drawingToggles[drawToggleIdx].node.addClass("active");
				}else{
					drawingToggles[drawToggleIdx].node.removeClass("active");
				}
			}
			var stx = this.context.stx;
			stx.resizeChart();
			document.querySelector('cq-palette-dock').handleResize();
			setContext({ drawingActive: value });
			chartContainer.setHeight();

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
