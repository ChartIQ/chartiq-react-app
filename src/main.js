import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import AdvancedChart from './containers/AdvancedChart'

import 'plugins/cryptoiq/cryptoiq'

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
		}
	},
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