import React from 'react';

import { ChartContext } from '../../../context/ChartContext';

export default class OrderBook extends React.Component {
	constructor() {
		super();
		this.orderBookRef = React.createRef();
	}

	componentDidMount() {
		const { marketDepth } = this.context.stx;
		const orderbook = this.orderBookRef.current;

		if (this.props.addToChart) {
			// attach orderbook to marketDepth container
			marketDepth.marketDepth.container.appendChild(orderbook);
			// provide reference to orderbook in marketDepth so orderbook can be opened from it
			marketDepth.marketDepth.orderbook = orderbook;
		}
	}

	render() {
		const { closeButton, price, size, totalSize, amount, totalAmount} = this.props;
		return (
			<React.Fragment>
				<cq-orderbook cq-active ref={this.orderBookRef}>
					{closeButton && <cq-close></cq-close>}
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
							{price && <div col="price">Price</div>}
							{size && <div col="size">Size</div>}
							{totalSize && <div col="cum_size">Total Size</div>}
							{amount && <div col="amount">Amount</div>}
							{totalAmount && <div col="cum_amount">Total Amount</div>}
						</cq-item>
					</template>
				</cq-orderbook>
			</React.Fragment>
		);
	}
}

OrderBook.contextType = ChartContext;
