import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";

import { default as RouteList } from "./containers/RouteList/RouteList";

// import AdvancedChartPage from "./containers/AdvancedChartPage";
// import TermStructurePage from './containers/CrossSectionPage';

import HelloWorld from "./containers/HelloWorld/HelloWorld";
import { MultiChartPage } from "./containers/MultiChart";
import CustomChart from "./containers/CustomChart/CustomChart";

import Chart from "@chartiq/react-components"
import { ChartPage as AdvancedChart } from '@chartiq/react-components/lib/Advanced'
import { WorkstationPage as ActiveTrader } from '@chartiq/react-components/lib/ActiveTrader'
import { ChartPage as CrossSection } from '@chartiq/react-components/lib/CrossSection'
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
			<Route path='/core-chart' component={Chart}></Route>
			<Route path='/technical-analysis'component={AdvancedChart}></Route>
			<Route path='/multi-chart' component={MultiChartPage}></Route>

			{CIQ.TFC && CIQ.MarketDepth &&
				<Route path="/active-trader" component={ActiveTrader}></Route>
			}

			{CIQ.CrossSection &&
				<Route path='/term-structure' component={CrossSection}></Route>
			}
			<Route path='/custom-chart' component={CustomChart}></Route>
			<Route path='/hello-world' component={HelloWorld}></Route>
		</Router>,
		el
	);
}
