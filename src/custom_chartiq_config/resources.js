// manage plugins here
import 'chartiq/js/chartiq';
import 'chartiq/js/components';
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';


// import event markers from examples
import ('chartiq/examples/markers/videoSample');
import ('chartiq/examples/markers/videoSample.css');


export const pluginsToLoadLazy = {
	// comment following line if cryptoiq plugin is not available
	cryptoiq: () => Promise.all([
		import( /* webpackChunkName: "cryptoiq" */ 'chartiq/plugins/cryptoiq/cryptoiq'),
		import( /* webpackChunkName: "marketdepth" */'chartiq/plugins/cryptoiq/marketdepth'),
		import( /* webpackChunkName: "orderbook" */'chartiq/plugins/cryptoiq/orderbook'),
		import( /* webpackChunkName: "L2_simulator" */'chartiq/examples/feeds/L2_simulator'),
	]),
	
	// comment following line if scriptiq plugin is not available
	scriptiq: () => import(/* webpackChunkName: "scriptiq" */ 'chartiq/plugins/scriptiq/scriptiq'),
	
	// comment following 5 lines if tfc plugin is not available
	tfc: () => Promise.all([
		import('chartiq/plugins/tfc/tfc-loader'),
		// Be sure to load some account file or TFC will not work
		import('chartiq/plugins/tfc/tfc-demo')
	]),

	// comment following line if timespan events are not available
	// Timespan events available starting 7.3
	timeSpanEvents: () => Promise.all([
		import ('chartiq/plugins/timespanevent/timespanevent'),
		import ('chartiq/plugins/timespanevent/examples/timeSpanEventSample')
	])

	// add additional plugins here
}


