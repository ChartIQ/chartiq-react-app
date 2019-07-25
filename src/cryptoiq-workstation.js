import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
import * as splines from 'thirdparty/splines'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import CryptoIQWorkstation from './containers/CryptoIQWorkstation'

import 'plugins/cryptoiq/cryptoiq'

import '../chartiq/css/normalize.css'
import '../chartiq/css/page-defaults.css'
import '../chartiq/css/perfect-scrollbar.css'
import '../chartiq/css/stx-chart.css'
import '../chartiq/css/chartiq.css'
import './chartiq-react-components.css'
import 'plugins/cryptoiq/cryptoiq.css'
import './components/Plugins/CryptoIQ/cryptoiq-workstation.css'

// Remove this file if you don't want the helicpter marker
// import './chartiq-abstract-marker.css'

let constructor = {}
let preferences = {labels:false, currentPriceLine:true, whitespace:0}
let enableAddOns = {
	InactivityTimer: {minutes:30}, 
	ExtendedHours: {filter:true}, 
	RangeSlider:true,
	Animation: { animationParameters: {tension: 0.3}}
}
let enablePlugins = {
	cryptoiq: {
		MarketDepth: {
			volume:true,
			mountain:true,
			step:true,
			record: true,
			height:"40%",
			precedingContainer: "#marketDepthBookmark"
		},
		OrderBook: {
			addToChart: false,
			closeButton: true,
			size: true,
			amount:true,
			price: true,
			// totalAmount: true,
			// totalSize: true
		},
		TFC: true
	},
}

ReactDom.render(
	React.createElement(CryptoIQWorkstation, {
		chartConstructor:constructor,
		preferences: preferences,
		addOns: enableAddOns,
		plugins: enablePlugins
	}),
	document.querySelector("#app")
)