import React from "react";
import ReactDom from "react-dom";

import "chartiq/css/page-defaults.css";

/**
 * This import is used for automated testing of the chart library. It is not needed 
 * for customer projects.
 */
import "./testInitialization.js";

/**
 * If you would like a minimal example of the Core Chart package, use the following
 * import to directly import Chart from the react components package.
 */
// import App from "@chartiq/react-components";

/**
 * If you would like to get started with the Core Chart package with included
 * example markets, translations, and markers, use the following
 * import to directly import Chart from the react components package.
 */
// import App from "@chartiq/react-components/Chart/ChartExample";

/**
 * If you would like to render the AdvancedChart for technical analysis, use the
 * following import. Requires the Technical Analysis package.
 */
// import App from "@chartiq/react-components/Chart/Advanced";

/**
 * AdvancedChart with example markets, translations, and markers
 */
// import App from "@chartiq/react-components/Chart/AdvancedExample";

/**
 * If you would like render the ActiveTrader Workstation with Trade From Chart
 * and MarketDepth, use the following import. Requires the ActiveTrader package or plug-in.
 */
// import App from "@chartiq/react-components/ActiveTrader";

/**
 * ActiveTrader Workstation with example markets, translations, and markers
 */
// import App from "@chartiq/react-components/ActiveTrader/WorkstationExample";

/* ActiveTrader requires TFC account. The tfc-demo provides an example implementation */
// import "chartiq/plugins/tfc/tfc-demo";

/**
 * If you would like to render a Cross Section for non time series data, use the
 * following import. Requires CrossSection Package or Technical Analysis Package with
 * CrossSection plug-in
 */
// import App from "@chartiq/react-components/CrossSection";

/**
 * If you would like to see a full listing of the different components that can
 * be built in React import the Router below
 */
import App from "./containers/Router/Router.js";

const el = document.querySelector("#app");

if (el) {
	ReactDom.render(<App />, el);
}
