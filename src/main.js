import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';


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
const { protocol, pathname } = document.location;
const baseLocation = pathname.replace(/[^/]*$/, '');
const Router = protocol === "file:" ? HashRouter : BrowserRouter;

if (el) {
	ReactDom.render(
		<Router basename={baseLocation}>
			<Route path="/" exact component={RouteList}></Route>
			<Route path="/index.html" component={RouteList}></Route>
			<Route path="/technical-analysis" render={()=><AdvancedChart chartInitialized={chartInitialized}/>}></Route>
			<Route path="/multi-chart" component={MultiChart}></Route>
			<Route path="/active-trader" render={()=><ActiveTraderWorkstation chartInitialized={chartInitialized}/>}></Route>
			<Route path="/custom-chart" component={CustomChart}></Route>
			<Route path="/hello-world" component={HelloWorld}></Route>
		</Router>,
		el
	);
}