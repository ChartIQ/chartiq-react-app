import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from '@chartiq/chartiq'
import { quoteFeedSimulator } from 'example-feeds/quoteFeedSimulator'
import AdvancedChart from './sample-template-advanced'

let constructor = {}
let preferences = {}
// constructor = {yAxis:{position:"left"}}
// preferences = {language: "de"}

ReactDom.render(
	React.createElement(AdvancedChart, {quoteFeed: quoteFeedSimulator, chartConstructor:{chart: constructor}, preferences: preferences}),
	document.querySelector("#app")
)

