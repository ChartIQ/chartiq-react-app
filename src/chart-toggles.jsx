import React from 'react'
import { ChartContext } from './react-chart-context'
import { Toggle } from 'components'
import HUDToggle from './hud-toggle'

export default class ChartToggles extends React.Component {

	componentDidMount () {
		let chart = $$$('chartiq-chart')
		let ciqChart = $$$('div.ciq-chart')
	// 	$$$(".ciq-sidenav")[0].registerCallback(function (value) {
	// 	var stx=this.context.stx, rightPx;
	// 	var sidePanelWidth = sidePanel?sidePanel.nonAnimatedWidth():0;
	// 	if (value === 'sidenavOn') {
	// 		var chartHolderHeight = $('.stx-holder').height();
	// 		$('.sidenav').height(chartHolderHeight);
	// 		this.node.addClass("active");
	// 		stx.layout.sidenav = "sidenavOn";
	// 		$('.sidenav').addClass("active");
	// 		rightPx=this.node.width()+sidePanelWidth;
	// 	} else if (value === 'sidenavOff') {
	// 		rightPx=sidePanelWidth;
	// 		$('.sidenav').removeClass("active");
	// 		this.node.removeClass("active");
	// 		stx.layout.sidenav = "sidenavOff";
	// 	}
	// 	$("cq-side-panel").css("right", rightPx - sidePanelWidth +"px");
	// 	$('.ciq-chart-area').css({'right': rightPx +'px'});
	// 	$('cq-tradingcentral').css({'margin-right': rightPx + 15 + 'px'});
	// 	stx.resizeChart();
	// });

	$$$(".ciq-draw").registerCallback(function(value){
		if(value){
			this.classList.add("active");
			chart.setAttribute("toolbar-active", true)
			ciqChart.classList.add("toolbar-on")
			// $$$("body").classList.add("toolbar-on");
		}else{
			this.classList.remove("active");
			chart.setAttribute("toolbar-active", false)
			ciqChart.classList.remove("toolbar-on")
			// $$$("body").classList.remove("toolbar-on");
		}
		chart.setHeight();
		var stx=this.context.stx;
		stx.resizeChart();

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

	componentDidUpdate() {
		console.log(this.props)
	}

	render () {
		const hud = this.context.UIContext.UIHeadsUpStatic && <HUDToggle />
		return (
			<>
<div className="sidenav-toggle ciq-toggles">
			<cq-toggle class="ciq-sidenav" cq-member="sidenav" cq-toggles="sidenavOn,sidenavOff"><span></span>
				<cq-tooltip>More</cq-tooltip>
			</cq-toggle>
		</div>

		<div className="icon-toggles ciq-toggles">
			<cq-toggle class="ciq-CH" cq-member="crosshair"><span></span><cq-tooltip>Crosshair</cq-tooltip></cq-toggle>
			{ hud }
			<cq-toggle class="ciq-draw"><span></span><cq-tooltip>Draw</cq-tooltip></cq-toggle>

			{/*<!-- comment in the following line if you are using the TFC plug in -->
 			<!-- <cq-toggle class="sidebar stx-trade"><span></span><cq-tooltip>Trade</cq-tooltip></cq-toggle> -->
			<!-- comment in the following line if you are using the tradingcentral plug in -->
			<!-- <cq-toggle class="stx-tradingcentral"><span></span><cq-tooltip>Analysis</cq-tooltip></cq-toggle> -->*/}
		</div>
		</>
		)
	}
}

ChartToggles.contextType = ChartContext; 
