import 'chartiq/examples/feeds/symbolLookupChartIQ';
import quoteFeed from "chartiq/examples/feeds/quoteFeedSimulator";
import defaultConfig from 'chartiq/js/defaultConfiguration';

// Creates a complete customised configuration object
function getConfig(resources = {}) {
	if(!resources.quoteFeed && resources.quoteFeed!== null ) resources.quoteFeed = quoteFeed
	return defaultConfig( resources );
}

// Creates a complete customised configuration object
function getCustomConfig({ chartId, symbol, onChartReady, resources } = {}) {
	const config = getConfig(resources);

	config.chartId = chartId || "_core-chart";
	config.initialSymbol = symbol || {
		symbol: "AAPL",
		name: "Apple Inc",
		exchDisp: "NASDAQ"
	};

	config.onChartReady = onChartReady;

	// Disable crossSection plugins by default
	// It can throw errors if when loaded with time series charts.
	config.plugins.crossSection = null;

	return config;
}

export { getConfig, getCustomConfig };
