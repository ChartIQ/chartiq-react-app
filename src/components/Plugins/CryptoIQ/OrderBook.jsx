import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'components'
// import 'plugins/cryptoiq/orderbook'
import UIManager from '../../Core/UIManager'
import 'feeds/L2_simulator'

import { ChartContext } from '../../../react-chart-context'

export default class OrderBook extends React.Component {
	constructor() {
		super()
		this.orderBookRef = React.createRef()
	}

	componentDidMount() {
		let stx = this.context.stx
		let quoteFeed = stx.quoteDriver.quoteFeed
		let marketDepth = stx.marketDepth
		let orderbook  = this.orderBookRef.current

		orderbook.parentElement.removeChild(orderbook)
		marketDepth.marketDepth.container.appendChild(orderbook)

		marketDepth.marketDepth.orderbook = orderbook

		if(quoteFeed.url && quoteFeed.url.includes("simulator.chartiq.com")) CIQ.simulateL2({stx:stx, onTrade:true});
	}

	render() {
		return(
			<React.Fragment>
				<cq-orderbook cq-active ref={this.orderBookRef} >
					<cq-close></cq-close>
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
							<div col="price">Price</div>
							<div col="size">Size</div>
							<div col="cum_size">Total Size</div>
							<div col="amount">Amount</div>
							<div col="cum_amount">Total Amount</div>
						</cq-item>
					</template>
				</cq-orderbook>
			</React.Fragment>
		)
	}
}

OrderBook.contextType = ChartContext