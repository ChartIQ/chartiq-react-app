import React from 'react';
import { ChartContext } from '../../../context/ChartContext';

export default class ToggleOrderBook extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = React.createRef();
	}

	componentDidMount() {
		const toggle = this.toggle.current;
		const { marketDepth } = this.context.stx.marketDepth;
		
		marketDepth.container.appendChild(toggle);
		
		// registered callback will respond to click and touch events
		toggle.registerCallback(() => {
			marketDepth.orderbook.open();
		}, false);
	}

	render() {
		return (
			<React.Fragment>
				<cq-toggle class="cq-orderbook-toggle" ref={this.toggle}>
					<cq-tooltip>Orderbook</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		);
	}
}
ToggleOrderBook.contextType = ChartContext;
