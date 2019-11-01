import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import { AdvancedChart } from './containers/AdvancedChart'

let constructor = {}
let preferences = {labels:false, currentPriceLine:true, whitespace:0}
let enableAddOns = {InactivityTimer: {minutes:30}, ExtendedHours: {filter:true}, RangeSlider:true}

export const Chart = () => {

	return (
		<AdvancedChart
			chartConstructor={constructor}
			preferences={preferences}
			addOns={enableAddOns}
		/>
	)
}

Chart.displayName = 'Chart'


// ReactDom.render(
// 	<Chart/>,
// 	document.querySelector("#app")
// )
