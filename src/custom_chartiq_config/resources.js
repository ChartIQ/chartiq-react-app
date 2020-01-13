// manage plugins here
import { CIQ } from 'chartiq/js/chartiq';
import 'chartiq/js/components';

// market definition and symbology sample overrides abstract function CIQ.Market.Symbology.factory
import 'chartiq/examples/markets/marketDefinitionsSample';
import 'chartiq/examples/markets/marketSymbologySample';

// import event markers from examples
// dynamic import along with webapck ignore comment is used here to prevent compile errors for missing resources
import('chartiq/examples/markers/videoSample').catch(onFail('videoSample markers'));  
import 'chartiq/examples/markers/videoSample.css';

import ('chartiq/examples/markers/tradeAnalyticsSample').catch(onFail('tradeAnalyticsSample'));
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

	// un-comment following lines to enable timespan (Life Cycle Events)
	// timeSpanEvents: () => Promise.all([
	// 	import('chartiq/plugins/timespanevent/timespanevent'),
	// 	import('chartiq/plugins/timespanevent/examples/timeSpanEventSample')
	// ])
};

function onFail(description) {
	return function (err) {
		if (CIQ.debug) console.log(' Error loading ' + description + '\n', err.message);
	}
}
