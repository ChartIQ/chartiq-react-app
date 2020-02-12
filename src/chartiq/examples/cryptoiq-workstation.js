import React from 'react'
import { render } from 'react-dom'
import 'chartiq/js/thirdparty/splines'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import CryptoIQWorkstation from '../containers/CryptoIQWorkstation'

import 'chartiq/plugins/cryptoiq/cryptoiq'

import 'chartiq/plugins/tfc/tfc-loader'
// Be sure to load some account file or TFC will not work
import 'chartiq/plugins/tfc/tfc-demo'

import 'chartiq/css/normalize.css'
import 'chartiq/css/page-defaults.css'
import 'chartiq/css/perfect-scrollbar.css'
import 'chartiq/css/stx-chart.css'
import 'chartiq/css/chartiq.css'
import '../styles/chartiq-react-components.css'
import 'chartiq/plugins/cryptoiq/cryptoiq.css'
import '../components/Plugins/CryptoIQ/cryptoiq-workstation.css'

import { getDefaultConfig } from '../_config';

const config = getDefaultConfig();
// Remove this file if you don't want the helicpter marker
// import './styles/chartiq-abstract-marker.css'

// let constructor = {}
// let preferences = {labels:false, currentPriceLine:true, whitespace:0}
// let enableAddOns = {
// 	InactivityTimer: {minutes:30}, 
// 	ExtendedHours: {filter:true}, 
// 	RangeSlider:true,
// 	Animation: { animationParameters: {tension: 0.3}}
// }


// const enablePlugins = {
// 	cryptoiq: {
// 		MarketDepth: {
// 			volume:true,
// 			mountain:true,
// 			step:true,
// 			record: true,
// 			height:"40%",
// 			precedingContainer: "#marketDepthBookmark"
// 		},
// 		OrderBook: {
// 			addToChart: false,
// 			closeButton: true,
// 			size: true,
// 			amount:true,
// 			price: true,
// 			// totalAmount: true,
// 			// totalSize: true
// 		},
// 	},
// 	TFC: true
// }

// render(
// 	React.createElement(CryptoIQWorkstation, {
// 		chartConstructor:constructor,
// 		preferences: preferences,
// 		addOns: enableAddOns,
// 		plugins: enablePlugins
// 	}),
// 	document.querySelector("#app")
// )
render(
	<CryptoIQWorkstation config={config} />,
	document.querySelector("#app")
)

contextContainer