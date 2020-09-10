// Required imports from chartiq for advanced chart

import { CIQ } from 'chartiq/js/chartiq';
import 'chartiq/js/advanced';

import 'chartiq/js/advanced';

import 'chartiq/js/addOns';

// Symbol mapping to market definition
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

import 'chartiq/examples/feeds/symbolLookupChartIQ';

import 'chartiq/examples/translations/translationSample';

import 'chartiq/js/componentUI';
import 'chartiq/js/components';

// Event Markers 
import marker from 'chartiq/examples/markers/markersSample.js';
import 'chartiq/examples/markers/tradeAnalyticsSample';
import 'chartiq/examples/markers/videoSample';

import quoteFeed from "chartiq/examples/feeds/quoteFeedSimulator.js";

// Uncomment the following for the forecasting simulator (required for the forecasting sample).
// import forecastQuoteFeed from "chartiq/examples/feeds/quoteFeedForecastSimulator.js";

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

import getConfig from 'chartiq/js/defaultConfiguration'; 

// Plugins

// Crypto, L2 Heat Map, Market Depth, 
// Important Note. Uncomment the corresponding configuration object below when enabling this plugin. 
// import 'chartiq/plugins/activetrader/cryptoiq';

// ScriptIQ 
// import 'chartiq/plugins/scriptiq/scriptiq';

// Trading Central: Technical Insights
// import 'chartiq/plugins/technicalinsights/components'

// TFC plugin
// Important Note. Uncomment the corresponding configuration object below when enabling this plugin. 
// import 'chartiq/plugins/tfc/tfc-loader';
// import 'chartiq/plugins/tfc/tfc-demo';   /* if using demo account class */

// Time Span Events
// Important Note. Uncomment the corresponding configuration object below when enabling this plugin. 
// import 'chartiq/plugins/timespanevent/timespanevent';
// import 'chartiq/plugins/timespanevent/examples/timeSpanEventSample';  /* if using sample */

// Trading Central: Analyst Views
// import 'chartiq/plugins/analystviews/components';

// Visual Earnings
// Important Note. Uncomment the corresponding configuration object below when enabling this plugin. 
// import 'chartiq/plugins/visualearnings/visualearnings';

// Uncomment the following for the L2 simulator (required for the crypto sample and MarketDepth addOn)
// import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

const config = getConfig({ 
	quoteFeed,
	// forecastQuoteFeed, // uncomment to enable forecast quote feed simulator
	markerSample: marker.MarkersSample,
	scrollStyle: PerfectScrollbar,
});

const { 
	marketDepth,
	termStructure,
	tfc,
	timeSpanEventPanel,
	visualEarnings
} = config.plugins;
// Select only plugin configurations that needs to be active for this chart
config.plugins = { 
	// marketDepth,
	// termStructure,
	// tfc,
	// timeSpanEventPanel,
	// visualEarnings
};

export { CIQ, config };