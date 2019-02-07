import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'quoteFeedSimulator'
import BasicChart from './sample-template-basic'

ReactDom.render(
	React.createElement(BasicChart, {layout: {}, preferences:{}}),
	document.querySelector("#app")
)
