import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import AdvancedChart from './containers/AdvancedChart'

import '../chartiq/css/normalize.css'
import '../chartiq/css/page-defaults.css'
import '../chartiq/css/perfect-scrollbar.css'
import '../chartiq/css/stx-chart.css'
import '../chartiq/css/chartiq.css'
// This file must be loaded last!
import './chartiq-react-components.css'
// import './_plugins.scss'
// import './components/Plugins/ScriptIQ/scriptiq.css'
// Remove this file if you don't want the helicpter marker
// import './chartiq-abstract-marker.css'

import 'plugins/cryptoiq/cryptoiq'
import 'plugins/tfc/tfc-loader'
// Be sure to load some account file or TFC will not work
import 'plugins/tfc/tfc-demo'
import 'plugins/scriptiq/scriptiq'
import 'plugins/tradingcentral/components'

let constructor = {}
let preferences = {labels:false, currentPriceLine:true, whitespace:0}
let enableAddOns = {
	InactivityTimer: {minutes:30},
	ExtendedHours: {filter:true},
	RangeSlider:true
}
let enablePlugins = {
	cryptoiq: {
		MarketDepth: {
			volume:true,
			mountain:true,
			step:true,
			record: true,
			height:"50%"
		},
		OrderBook: {
			addToChart: true,
			closeButton: true,
			size: true,
			amount:true,
			price: true,
			totalAmount: true,
			totalSize: true
		}
	},
	TFC: true,
	ScriptIQ: true,
	TradingCentral: true
}

ReactDom.render(
	React.createElement(AdvancedChart, {
		chartConstructor:constructor,
		preferences: preferences,
		addOns: enableAddOns,
		plugins: enablePlugins
	}),
	document.querySelector("#app")
)