import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";

// Base styles required for all charts
import "./chartiq/styles/base-imports";

import { default as RouteList } from "./chartiq/containers/RouteList/RouteList";
import {
	AdvancedChart,
	MultiChart,
	// Enable ActiveTraderWorkstation
	// ActiveTraderWorkstation,
	// Enable TermStructure
	// TermStructure,
	CustomChart,
	HelloWorld
} from "@chartiq/chartiq-react-components";

// Enable the following import if the channelSubscribe reference or the call to CIQ.simulateL2 in the chartInitialized reference are required.
// import { CIQ } from 'chartiq/js/componentUI';
// const { channelSubscribe } = CIQ.UI.BaseComponent.prototype;

// Optional callback function to access chart engine and uiContext
const chartInitialized = ({ chartEngine, uiContext }) => {
	// chartEngine provides access to chart engine CIQ.ChartEngine
	// uiContext provides access to UI component interaction CIQ.UI.Context
	// Methods for capturing state changes in chart engine and UI
	// Channel subscribe
	// const { channels } = uiContext.config;
	// channelSubscribe(channels.breakpoint, (value) => {
	// 	console.log('channels.breakpoint',value);
	// }, chartEngine);
	// Create layout listener, see parameters at https://documentation.chartiq.com/global.html#layoutEventListener
	// chartEngine.addEventListener('layout', ({ layout }) => {
	// 	console.log('layout changed', layout);
	// });
	// Simulate L2 data using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
	// CIQ.simulateL2({ stx: chartEngine, onInterval: 1000, onTrade: true });
};

// Optional callback function for when chart is initalized and initial data is available
const onChartReady = (chartEngine) => {};

// comment rendering to DOM if used only as export for example in CRA App.js
const el = document.querySelector("#app");
const { protocol, pathname } = document.location;
const baseLocation = pathname.replace(/[^/]*$/, "");
const Router = protocol === "file:" ? HashRouter : BrowserRouter;

if (el) {
	ReactDom.render(
		<Router basename={baseLocation}>
			<Route path='/' exact component={RouteList}></Route>
			<Route path='/index.html' component={RouteList}></Route>
			<Route
				path='/technical-analysis'
				render={() => (
					<AdvancedChart
						chartInitialized={chartInitialized}
						onChartReady={onChartReady}
					/>
				)}></Route>
			<Route path='/multi-chart' component={MultiChart}></Route>

			{/* Enable ActiveTraderWorkstation */}
			{/*
			<Route
				path="/active-trader"
				render={() => (
					<ActiveTraderWorkstation
						chartInitialized={chartInitialized}
						onChartReady={onChartReady}
					/>
				)}
			></Route>
			*/}

			{/* Enable TermStructure */}
			{/* <Route
				path='/term-structure'
				component={TermStructure}
				render={() => (
					<TermStructure
						chartInitialized={chartInitialized}
						onChartReady={onChartReady}
					/>
				)}
				></Route> */}
			<Route path='/custom-chart' component={CustomChart}></Route>
			<Route path='/hello-world' component={HelloWorld}></Route>
		</Router>,
		el
	);
}
