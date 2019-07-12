import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
import MarketDepth from './containers/MarketDepth'

import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'

ReactDom.render(
	React.createElement(MarketDepth, {
		symbol: "^USDEUR",
		quoteFeed: quoteFeedSimulator,
		quoteFeedBehavior: {refreshInterval: 1}
	}),
	document.querySelector("#app")
)