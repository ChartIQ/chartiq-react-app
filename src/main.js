import React from "react";
import ReactDom from "react-dom";

import "chartiq/css/page-defaults.css"

import App from './containers/Router/Router';

// import App from '@chartiq/react-components/Chart/ChartExample'

/**
 * If you would like a minimul example of the Core Chart package, use the following
 * import to directly import Chart from the react components package.
 */
//import App from '@chartiq/react-components

/**
 * If you would like to render the AdvancedChart for technical analysis, use the
 * following import. Requires the Technical Analysis package.
 */
// import App from '@chartiq/react-components/Chart/Advanced'

/**
 * If you would like render the ActiveTrader Workstation with Trade From Chart
 * and MarketDepth, use the following import. Requires the ActiveTrader package or
 * Technical Analysis with ActiveTrader plug-in.
 */
// import App from '@chartiq/react-components/ActiveTrader'

/**
 * If you would like to render a Cross Section for non time series data, use the
 * following import. Requires CrossSection Package or Technical Analysis Package with
 * CrossSection plug-in
 */
// import App from '@chartiq/react-components/CrossSection'


const el = document.querySelector("#app");

ReactDom.render(<App />,document.querySelector("#app"));
