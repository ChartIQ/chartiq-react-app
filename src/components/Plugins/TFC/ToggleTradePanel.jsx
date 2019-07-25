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
		let stx = this.context.stx
		node.registerCallback(function(){
			stx.marketDepth.marketDepth.orderbook.open()
		}, false)
	}

	render() {
		return(
			<React.Fragment>
				<cq-toggle class="tfc-ui-sidebar stx-trade" ref={this.toggle}>
					<cq-tooltip>Trade</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		)
	}
}
ToggleOrderBook.contextType = ChartContext