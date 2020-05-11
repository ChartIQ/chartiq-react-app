// Manage resources and plugins here
// import 'chartiq/js/thirdparty/perfect-scrollbar.jquery.js';
import { CIQ } from 'chartiq/js/chartiq';

// chart style sheets
import '../chartiq/styles/base-imports';

// custom css styles following base style sheets
import './chart_styles.css';

import 'chartiq/js/addOns';
import 'chartiq/js/components';

// market definition and symbology sample overrides abstract function CIQ.Market.Symbology.factory
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

import 'chartiq/examples/markers/videoSample.css';
import 'chartiq/examples/markers/videoSample'; 
import 'chartiq/examples/markers/tradeAnalyticsSample.css';
import 'chartiq/examples/markers/tradeAnalyticsSample';

// comment any properties if plugins are not needed or not available to prevent compilation errors
export const pluginsToLoadLazy = {
	// cryptoiq: () => Promise.all([
	// 	import(/* webpackChunkName: "cryptoiq" */ 'chartiq/plugins/cryptoiq/cryptoiq'),
	// 	import(/* webpackChunkName: "marketdepth" */ 'chartiq/plugins/cryptoiq/marketdepth'),
	// 	import(/* webpackChunkName: "orderbook" */ 'chartiq/plugins/cryptoiq/orderbook'),
	// 	import(/* webpackChunkName: "L2_simulator" */ 'chartiq/examples/feeds/L2_simulator')
	// ]),

	// scriptiq: () => import(/* webpackChunkName: "scriptiq" */ 'chartiq/plugins/scriptiq/scriptiq'),

	// tfc: () => Promise.all([
	// 	import('chartiq/plugins/tfc/tfc-loader'),
	// 	import('chartiq/plugins/tfc/tfc-demo') // Be sure to load some account file or TFC will not work
	// ]),

	// un-comment following lines to enable timespan (Life Cycle Events)
	// timeSpanEvents: () => Promise.all([
	// 	import('chartiq/plugins/timespanevent/timespanevent'),
	// 	import('chartiq/plugins/timespanevent/examples/timeSpanEventSample')
	// ])
};

CIQ.UI.ensureComponentsRegistered();
export { CIQ };

export { AdvancedChart } from '../chartiq';
