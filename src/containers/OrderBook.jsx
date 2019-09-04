import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'components'
import 'plugins/cryptoiq/orderbook'
import UIManager from '../components/Core/UIManager'
import 'feeds/L2_simulator'

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

		this.createOrderBook = orderbook => {
			var stxx = this.stx = new CIQ.ChartEngine({container: this.engineRef.current})
			// If in development allow access to globals for easy debugging
			if(process.env.NODE_ENV !== 'production') {
				if(!window.cq_debug) {
					window.cq_debug = {
						CIQ: CIQ,
						stx_ob: this.stx
					}
				}
				else window.cq_debug.stx_ob = this.stxx
			}
		}

		this.engineRef = React.createRef()
		this.orderBookRef = React.createRef()
	}

	componentDidMount() {
		this.createOrderBook(this.orderBookRef.current);
		const props = this.props;
		let quoteFeed = props.quoteFeed;
		let stxx = this.stx;

		// initialize the UI context
		let UIContext=new CIQ.UI.Context(stxx, document.querySelector("*[cq-context]"));

		// attach a quoteFeed if one is passed down as a prop
		if(quoteFeed) {
			stxx.attachQuoteFeed(quoteFeed, props.quoteFeedBehavior);
			// initialize the sample data feed
			if(CIQ.simulateL2) CIQ.simulateL2({stx:stxx, onTrade:true});
		} 


		// load a symbol so the OrderBook loads
		stxx.loadChart(props.symbol || "^BTCUSD")
	}

	componentDidUpdate() {
		let self=this;
		this.stx.loadChart(self.props.symbol, null, self.symbolChangeCallback)
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
		return(
			<React.Fragment>
				<UIManager />
				<div className="chartContainer" style={{"width":"800px","height":"460px","position":"relative", "visibility":"hidden"}} ref={this.engineRef}></div>
				<cq-orderbook cq-active ref={this.orderBookRef}>
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