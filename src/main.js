import React from "react";
import {createRoot} from 'react-dom/client';

import "chartiq/css/page-defaults.css";

/**
 * This import is used for automated testing of the chart library. It is not needed 
 * for customer projects.
 */
import "./testInitialization.js";

/**
 * If you would like to get started with the Core Chart package with included
 * example markets, translations, and markers, use the following
 * import to directly import Chart from the react components package.
 */
// import App from "./components/Chart/ChartExample.jsx";

/**
 * If you would like to render the AdvancedChart for technical analysis, use the
 * following import. Requires the Technical Analysis package.
 */
// import App from "./components/Chart/Advanced.jsx";

/**
 * AdvancedChart with example markets, translations, and markers
 */
// import App from "./components/Chart/AdvancedExample.jsx";

/**
 * If you would like render the ActiveTrader Workstation with Trade From Chart
 * and MarketDepth, use the following import. Requires the ActiveTrader package or plug-in.
 */
// import App from "./components/ActiveTrader/index.js";

/**
 * ActiveTrader Workstation with example markets, translations, and markers
 */
// import App from "./components/ActiveTrader/WorkstationExample.jsx";

/* ActiveTrader requires TFC account. The tfc-demo provides an example implementation */
// import "chartiq/plugins/tfc/tfc-demo";

/**
 * If you would like to render a Cross Section for non time series data, use the
 * following import. Requires CrossSection Package or Technical Analysis Package with
 * CrossSection plug-in
 */
//import App from "./components/CrossSection/index.js";

/**
 * If you would like to see a full listing of the different components that can
 * be built in React import the Router below
 */
import App from "./containers/Router/Router.js";
const el = document.querySelector("#app");
if (el) {
    const root = createRoot(el);
    root.render(<App />);
}
