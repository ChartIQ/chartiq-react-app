import React from 'react'
import { CIQ } from 'chartiq/js/chartiq'
import 'chartiq/js/components'
import 'chartiq/plugins/cryptoiq/orderbook'
import 'chartiq/examples/feeds/L2_simulator'
import UIManager from '../components/Core/UIManager'
import { relative } from 'path'

/**
 * Stand alone OrderBook component `<OrderBook />`.
 *
 * Renders the Orderbook table based on the chart's current market data.
 * @param quoteFeed object - A valid quoteFeed for fetching data
 * @param quoteFeedBehavior object - The behavior object to pass into your quoteFeed when it is attached
 * @export
 * @class WrappedChart
 * @extends {React.Component}
 */
export default class OrderBook extends React.Component {
	constructor(props) {
		super(props);

		this.createOrderBook = container => {
			const stx = new CIQ.ChartEngine({ container })
			// If in development allow access to globals for easy debugging
			if(process.env.NODE_ENV !== 'production') {
				if(!window.cq_debug) {
					window.cq_debug = {
						CIQ: CIQ,
						stx_ob: stx
					}
				}
			}
			return stx;
		}

		this.chartContainer = React.createRef();
	}

	componentDidMount() {
		const { symbol, quoteFeed, quoteFeedBehavior } = this.props;

		const chartContainer = this.chartContainer.current;
		const stx = this.createOrderBook(chartContainer);
		this.stx = stx;
		
		// initialize the UI context
		const contextContainer = getContextContainer(chartContainer);
		new CIQ.UI.Context(stx, contextContainer);

		// attach a quoteFeed if one is passed down as a prop
		if(quoteFeed) {
			stx.attachQuoteFeed(quoteFeed, quoteFeedBehavior);
			// initialize the sample data feed
			if(CIQ.simulateL2) CIQ.simulateL2({ stx, onTrade: true });
		} 

		// load a symbol so the OrderBook loads
		stx.loadChart(symbol || "^BTCUSD");

		function getContextContainer(el) {
			let node = el;
			while (node && !/cq-context/i.test(node.tagName + node.className)){
				node = node.parentNode;
			}
			return node;
		}
	}

	componentDidUpdate() {
		this.stx.loadChart(this.props.symbol, null, this.symbolChangeCallback)
	}

	/**
	 * Overwrite me with any function to be called when the symbol changes
	 */
	symbolChangeCallback() {}
	/**
	 * Wrapper around CIQ.ChartEngine function of the same name.
	 * @see {@ link https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData}
	 * This function will immediately call draw for you so that you can immediately see results
	 */
	updateCurrentMarketData(data, chart, symbol, params) {
		this.stx.updateCurrentMarketData(data, chart, symbol, params);
		this.stx.draw();
	} 

	render() {
		const orderBookStyle = {
			top: 40,
			bottom: 16, 
			left: 16,
			right: 16,
			border: 'solid 1px #ccc'
		}
		return(
			<cq-context>
				<UIManager  />
				<div className="chartContainer" style={{ visibility: 'hidden' }} ref={this.chartContainer}></div>
				
				<cq-orderbook cq-active style={orderBookStyle}>
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
				</cq-context>
		)
	}
}