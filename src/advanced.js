import React from 'react'
import ReactDom from 'react-dom'
import AdvancedChart from './containers/AdvancedChart'

import 'chartiq/css/normalize.css'
import 'chartiq/css/page-defaults.css'
import 'chartiq/css/perfect-scrollbar.css'
import 'chartiq/css/stx-chart.css'
import 'chartiq/css/chartiq.css'
// Remove this file if you don't want the helicopter marker
import './chartiq-abstract-marker.css'

// Add these files if you want the Trade markers
import 'chartiq/examples/markers/tradeAnalyticsSample'
import 'chartiq/examples/markers/tradeAnalyticsSample.css'
// This file must be loaded last after default ChartIQ styles!
import './chartiq-react-components.css'

import 'chartiq/js/addOns'
import 'chartiq/plugins/cryptoiq/cryptoiq'
import 'chartiq/plugins/tfc/tfc-loader'
// Be sure to load some account file or TFC will not work
import 'chartiq/plugins/tfc/tfc-demo'
import 'chartiq/plugins/scriptiq/scriptiq'
import 'chartiq/plugins/timespanevent/timespanevent'
import 'chartiq/plugins/timespanevent/examples/timeSpanEventSample'
import "chartiq/js/thirdparty/perfect-scrollbar.jquery.js";

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
			height:"50%",
			precedingContainer: '.market-depth-bookmark'
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
	TimeSpanEvents: true,
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