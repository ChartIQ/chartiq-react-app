import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'components'
import 'plugins/cryptoiq/orderbook'
import UIManager from '../components/Core/UIManager'
import 'feeds/L2_simulator'


export default class OrderBook extends React.Component {
    constructor(props) {
		super(props);

		this.createOrderBook = orderbook => {
			var stxx = this.stx = new CIQ.ChartEngine({container: document.querySelector('.chartContainer')})
		}

		this.orderBookRef = React.createRef()
	}

	componentDidMount () {
  		this.createOrderBook(this.orderBookRef.current);
		let stxx = window.stxx = this.stx;

		// initialize the UI context
		let UIContext=new CIQ.UI.Context(stxx, document.querySelector("*[cq-context]"));

		// initialize the sample data feed
		CIQ.simulateL2({stx:stxx, onInterval:1000, onTrade:true});

		// load a symbol so the OrderBook loads
		stxx.loadChart('^USDBTC')
	}

	render() {
		return(
			<React.Fragment>
			  <UIManager />
				<div className="chartContainer" style={{"width":"800px","height":"460px","position":"relative"}} ref={this.engineRef}></div>
				<cq-orderbook cq-active ref={this.orderBookRef}>
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