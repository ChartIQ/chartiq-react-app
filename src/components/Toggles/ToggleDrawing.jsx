import React from 'react'
import { ChartContext } from '../../react-chart-context'

/**
 * Chart toggle for turningg on 
 */
export default class ToggleDrawing extends React.Component {

	constructor() {
		super()
		this.toggle = React.createRef()
	}

	componentDidMount () {
		let chart = this.context.stx.container
		let ciqChart = chart.parentElement

		this.toggle.current.registerCallback(function(value){
			if(value){
				this.classList.add("active");
				chart.setAttribute("toolbar-active", true)
				ciqChart.classList.add("toolbar-on")
			}else{
				this.classList.remove("active");
				chart.setAttribute("toolbar-active", false)
				ciqChart.classList.remove("toolbar-on")
			}
			chart.setHeight();
			var stx=this.context.stx;
			stx.resizeChart();
			document.querySelector('cq-palette-dock').handleResize();

			// a little code here to remember what the previous drawing tool was
			// and to re-enable it when the toolbar is reopened
			if(value){
				stx.changeVectorType(this.priorVectorType);
			}else{
				this.priorVectorType=stx.currentVectorParameters.vectorType;
				stx.changeVectorType("");
			}
		});

	}

	render() {
		return(
			<cq-toggle class="ciq-draw" ref={this.toggle}>
				<span></span><cq-tooltip>Draw</cq-tooltip>
			</cq-toggle>
		)
	}
}

ToggleDrawing.contextType = ChartContext;