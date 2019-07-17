import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
import OrderBook from './containers/OrderBook'

import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'

import '../chartiq/css/normalize.css'
import '../chartiq/css/page-defaults.css'
import '../chartiq/css/perfect-scrollbar.css'
import '../chartiq/css/stx-chart.css'
import '../chartiq/css/chartiq.css'
import '../chartiq/plugins/cryptoiq/cryptoiq.css'
import './chartiq-react-components.css'

ReactDom.render(
	React.createElement(OrderBook, {
		symbol: "^USDBTC",
		quoteFeed: quoteFeedSimulator,
		quoteFeedBehavior: {refreshInterval: 1}
	}),
	document.querySelector("#app")
)