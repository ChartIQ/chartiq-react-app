import React from 'react'
import { ChartContext } from '../../../react-chart-context'

export default class ToggleTradePanel extends React.Component {
	constructor(props) {
		super(props)
		this.toggle = React.createRef()
	}

	componentDidMount() {
		this.setToggleCallback(this.toggle.current)
	}

	setToggleCallback(node) {
		let context = this.context
		let stx = context.stx
		context.UIContext.ToggleTradePanel = this.toggle.current
		node.registerCallback(function(value) {
				var sidePanel=$("cq-side-panel")[0];
				if(value){
					sidePanel.open({selector:".stx-trade-panel",className:"active"});
					this.node.addClass("active");
					$(".stx-trade-panel").removeClass("closed");
					stx.layout.sidenav = 'sidenavOff'; // in break-sm hide sidenav when turning on tfc side panel
				}else{
					sidePanel.close();
					this.node.removeClass("active");
					$(".stx-trade-panel").addClass("closed");
				}
				let sidePanelWidth = sidePanel.nonAnimatedWidth()
				context.chartArea.node.style.right = sidePanelWidth+'px'
				context.resize()
				document.querySelector('cq-palette-dock').handleResize();
			});
	}

	render() {
		return(
			<React.Fragment>
				<cq-toggle class="tfc-ui-sidebar stx-trade" ref={this.toggle}>
					<span></span>
					<cq-tooltip>Trade</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		)
	}
}
ToggleTradePanel.contextType = ChartContext