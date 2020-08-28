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
if (el) {
	ReactDom.render(
		<BrowserRouter>
			<Route path="/" exact component={RouteList}></Route>
			<Route path="/technical-analysis" exact render={()=><AdvancedChart chartInitialized={chartInitialized}/>}></Route>
			<Route path="/multi-chart" exact component={MultiChart}></Route>
			<Route path="/active-trader" exact render={()=><ActiveTraderWorkstation chartInitialized={chartInitialized}/>}></Route>
			<Route path="/custom-chart" exact component={CustomChart}></Route>
			<Route path="/hello-world" exact component={HelloWorld}></Route>
		</BrowserRouter>,
		el
	);
}

export default (props) => (<AdvancedChart
	chartInitialized={chartInitialized}
	/>);