import React from 'react'
import { ChartContext } from '../../../react-chart-context'

export default class ToggleOrderBook extends React.Component {
	constructor(props) {
		super(props)
		this.toggle = React.createRef()
	}

	componentDidMount() {
		let node = this.toggle.current
		this.setToggleCallback(node)
		if(this.props.addToChart) {
			node.parentElement.removeChild(node)
			this.context.stx.marketDepth.marketDepth.container.appendChild(node)
		}
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
				<cq-toggle class="cq-orderbook-toggle" ref={this.toggle}>
					<cq-tooltip>Orderbook</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		)
	}
}
ToggleOrderBook.contextType = ChartContext