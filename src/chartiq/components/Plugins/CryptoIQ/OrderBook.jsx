import React from 'react';

import ToggleOrderBook from './ToggleOrderBook';
import { ChartContext } from '../../../context/ChartContext';

export default class OrderBook extends React.Component {
	constructor() {
		super();
		this.orderBookRef = React.createRef();
	}

	componentDidMount() {
		const { stx, stx: { marketDepth} } = this.context;
		const orderbook = this.orderBookRef.current;

		if (this.props.addToChart) {
			orderbook.parentElement.removeChild(orderbook);
			marketDepth.marketDepth.container.appendChild(orderbook);

			marketDepth.marketDepth.orderbook = orderbook;
		}
	}

	render() {
		const props = this.props;
		return (
			<React.Fragment>
				<cq-orderbook cq-active ref={this.orderBookRef}>
					{props.closeButton && <cq-close></cq-close>}
					<cq-orderbook-table reverse>
						<cq-scroll cq-no-claim>
							<cq-orderbook-bids></cq-orderbook-bids>
						</cq-scroll>
					</cq-orderbook-table>
					<cq-orderbook-table>
						<cq-scroll cq-no-claim>
							<cq-orderbook-asks></cq-orderbook-asks>
						</cq-scroll>
					</cq-orderbook-table>
					<template>
						<cq-item cq-size-shading>
							{props.price && <div col="price">Price</div>}
							{props.size && <div col="size">Size</div>}
							{props.totalSize && <div col="cum_size">Total Size</div>}
							{props.amount && <div col="amount">Amount</div>}
							{props.totalAmount && <div col="cum_amount">Total Amount</div>}
						</cq-item>
					</template>
				</cq-orderbook>
			</React.Fragment>
		);
	}
}

OrderBook.contextType = ChartContext;
