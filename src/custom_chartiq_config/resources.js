// manage plugins here
import 'chartiq/js/chartiq';
import 'chartiq/js/components';

// market definition and symbology sample overrides abstract function CIQ.Market.Symbology.factory
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

// import event markers from examples 
import 'chartiq/examples/markers/videoSample';
import 'chartiq/examples/markers/videoSample.css';

import 'chartiq/examples/markers/tradeAnalyticsSample';
import 'chartiq/examples/markers/tradeAnalyticsSample.css';

// comment any properties if plugins are not needed or not available to prevent compilation errors
export const pluginsToLoadLazy = {
	cryptoiq: () => Promise.all([
		import(/* webpackChunkName: "cryptoiq" */ 'chartiq/plugins/cryptoiq/cryptoiq'),
		import(/* webpackChunkName: "marketdepth" */ 'chartiq/plugins/cryptoiq/marketdepth'),
		import(/* webpackChunkName: "orderbook" */ 'chartiq/plugins/cryptoiq/orderbook'),
		import(/* webpackChunkName: "L2_simulator" */ 'chartiq/examples/feeds/L2_simulator')
	]),

	scriptiq: () => import(/* webpackChunkName: "scriptiq" */ 'chartiq/plugins/scriptiq/scriptiq'),

	tfc: () => Promise.all([
		import('chartiq/plugins/tfc/tfc-loader'),
		import('chartiq/plugins/tfc/tfc-demo') // Be sure to load some account file or TFC will not work
	]),

	// comment following line if timespan events are not available
	// Timespan events available starting 7.3
	timeSpanEvents: () => Promise.all([
		import('chartiq/plugins/timespanevent/timespanevent'),
		import('chartiq/plugins/timespanevent/examples/timeSpanEventSample')
	])
};
