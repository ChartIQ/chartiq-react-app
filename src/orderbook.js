import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
import OrderBook from './containers/OrderBook'

// You don't actually need to pass in a quoteFeed if you would like to stream data in
// In this case we're attaching a quoteFeed to suppress warnings 
import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import * as L2Simulator from 'feeds/L2_simulator'

ReactDom.render(
	React.createElement(OrderBook, {
		symbol: "^USDBTC",
		quoteFeed: quoteFeedSimulator,
		quoteFeedBehavior: {refreshInterval: 1}
	}),
	document.querySelector("#app")
)