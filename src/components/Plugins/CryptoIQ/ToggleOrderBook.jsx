import React from 'react'
import { ChartContext } from '../../../react-chart-context'

export default class ToggleOrderBook extends React.Component {
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
				<cq-toggle class="cq-orderbook-toggle" ref={this.toggle} style={{right: '35px', bottom: '25px'}}>
					<cq-tooltip>Orderbook</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		)
	}
}
ToggleOrderBook.contextType = ChartContext