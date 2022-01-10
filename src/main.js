import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";

import { default as RouteList } from "./containers/RouteList/RouteList";

// import AdvancedChartPage from "./containers/AdvancedChartPage";
import MultiChartPage from "./containers/MultiChartPage";
import ActiveTraderPage from "./containers/ActiveTraderPage";
import TermStructurePage from './containers/CrossSectionPage';
import CustomChart from "./containers/CustomChart/CustomChart";
import { AdvancedChartPage, HelloWorld } from "@chartiq/react-components";

import { CIQ } from "chartiq/js/chartiq"

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
			<Route path='/technical-analysis'component={AdvancedChartPage}></Route>
			<Route path='/multi-chart' component={MultiChartPage}></Route>

			{CIQ.TFC && CIQ.MarketDepth &&
				<Route path="/active-trader" component={ActiveTraderPage}></Route>
			}

			{CIQ.CrossSection &&
				<Route path='/term-structure' component={TermStructurePage}></Route>
			}
			<Route path='/custom-chart' component={CustomChart}></Route>
			<Route path='/hello-world' component={HelloWorld}></Route>
		</Router>,
		el
	);
}
