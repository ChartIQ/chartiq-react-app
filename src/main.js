import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import AdvancedChart from './containers/AdvancedChart'

let constructor = {}
let preferences = {labels:false, currentPriceLine:true, whitespace:0}
let enableAddOns = {InactivityTimer: {minutes:30}, ExtendedHours: {filter:true}, RangeSlider:true}

ReactDom.render(
	React.createElement(AdvancedChart, {chartConstructor:constructor, preferences: preferences, addOns: enableAddOns}),
	document.querySelector("#app")
)