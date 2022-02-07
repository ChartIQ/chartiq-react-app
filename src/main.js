import React from "react";
import ReactDom from "react-dom";
// import { BrowserRouter, HashRouter, Route } from "react-router-dom";

import { default as Routes } from "./containers/RouteList/RouteList";

// import "chartiq/css/page-defaults.css"

// import HelloWorld from "./containers/HelloWorld/HelloWorld";
// import { MultiChartPage } from "./containers/MultiChart";
// import CustomChart from "./containers/CustomChart/CustomChart";

// import { ChartExample as Chart } from "@chartiq/react-components/Chart"
// import AdvancedChart from '@chartiq/react-components/Chart/AdvancedExample'
// // import { WorkstationExample as ActiveTrader } from '@chartiq/react-components/ActiveTrader'
// // import { ChartExample as CrossSection } from '@chartiq/react-components/CrossSection'
// import { CIQ } from "chartiq/js/chartiq"

// window.CIQ = CIQ;
// comment rendering to DOM if used only as export for example in CRA App.js
const el = document.querySelector("#app");
// const { protocol, pathname } = document.location;
// const baseLocation = pathname.replace(/[^/]*$/, "");
// const Router = protocol === "file:" ? HashRouter : BrowserRouter;

if (el) {
	ReactDom.render(
		<Routes></Routes>,
		el
	);
}
