import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


// Base styles required for all charts
import './chartiq/styles/base-imports';

import { default as RouteList } from './chartiq/containers/RouteList/RouteList';
import { AdvancedChart, MultiChart, ActiveTraderWorkstation, CustomChart, HelloWorld } from './chartiq';

// Optional callback function to access chart engine and uiContext
const chartInitialized = ({ chartEngine, uiContext }) => {
	// chartEngine provides access to chart engine CIQ.ChartEngine
	// uiContext provides access to UI component interaction CIQ.UI.Context
};

// comment rendering to DOM if used only as export for example in CRA App.js
const el = document.querySelector('#app');
const baseLocation = document.location.pathname.replace(/[^/]*$/, '');

if (el) {
	ReactDom.render(
		<BrowserRouter>
			<Route path={baseLocation} exact component={RouteList}></Route>
			<Route path={`${baseLocation}technical-analysis`} render={()=><AdvancedChart chartInitialized={chartInitialized}/>}></Route>
			<Route path={`${baseLocation}multi-chart`} component={MultiChart}></Route>
			<Route path={`${baseLocation}active-trader`} render={()=><ActiveTraderWorkstation chartInitialized={chartInitialized}/>}></Route>
			<Route path={`${baseLocation}custom-chart`} component={CustomChart}></Route>
			<Route path={`${baseLocation}hello-world`} component={HelloWorld}></Route>
		</BrowserRouter>,
		el
	);
}