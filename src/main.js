import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import AdvancedChart from './containers/sample-template-advanced'

let constructor = {}
let preferences = {}
// constructor = {yAxis:{position:"left"}}
preferences = {labels:false, currentPriceLine:true, whitespace:0}

ReactDom.render(
	React.createElement(AdvancedChart, {chartConstructor:constructor, preferences: preferences}),
	document.querySelector("#app")
)