import React from 'react'
import { ChartContext } from '../../../context/ChartContext'

export default class TradeHistory extends React.Component {
	constructor(props) {
		super(props)
		this.tradeHist = React.createRef()
	}

	render() {
		return(
			<React.Fragment>
			<div id="cryptoGroup1">
				<div id="tradeHistoryContainer">
					<cq-tradehistory cq-active>
						<cq-tradehistory-table>
							<cq-scroll cq-no-claim>
								<cq-tradehistory-body maxrows="500"></cq-tradehistory-body>
							</cq-scroll>
						</cq-tradehistory-table>
						<template>
							<cq-item>
								<div col="time">Time</div>
								<div col="qty">Qty</div>
								<div col="price">Price</div>
								<div col="amount">Amount</div>
							</cq-item>
						</template>
					</cq-tradehistory>
				</div>
			</div>
			</React.Fragment>
		)
	}
}
TradeHistory.contextType = ChartContext