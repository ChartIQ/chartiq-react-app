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

	// Update chart configuration by modifying default configuration
	config.chartId = chartId || "_advanced-chart";
	config.initialSymbol = symbol || {
		symbol: "AAPL",
		name: "Apple Inc",
		exchDisp: "NASDAQ"
	};

	// config.quoteFeeds[0].behavior.refreshInterval = 0; // disables quotefeed refresh
	config.onChartReady = onChartReady;

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

	// Enable / disable addOns
	// config.enabledAddOns.tooltip = false;
	// config.enabledAddOns.continuousZoom = true;

	return config;
}

export { getConfig, getCustomConfig };
