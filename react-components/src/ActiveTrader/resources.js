import 'chartiq/examples/feeds/symbolLookupChartIQ';
import quoteFeed from "chartiq/examples/feeds/quoteFeedSimulator";
import defaultConfig from 'chartiq/js/defaultConfiguration';

// Uncomment the following for the L2 simulator (required for the crypto sample and MarketDepth addOn)
import 'chartiq/examples/feeds/L2_simulator'; /* for use with cryptoiq */

// Creates a complete customised configuration object
function getConfig(resources = {}) {
	if(!resources.quoteFeed && resources.quoteFeed!== null ) resources.quoteFeed = quoteFeed
	return defaultConfig( resources );
}

// Creates a complete customised configuration object
function getCustomConfig({ chartId, symbol, onChartReady, resources } = {}) {
	const config = getConfig(resources);

	// Update chart configuration by modifying default configuration
	config.chartId = chartId || "_active-trader-chart";
	config.initialSymbol = symbol || "^USDAUD";
	config.onChartReady = onChartReady;

	// Enable / disable addOns here before creating the chart
	config.enabledAddOns.animation = true;

	const { 
		marketDepth,
		tfc,
	} = config.plugins;
	// Select only plugin configurations that needs to be active for this chart
	config.plugins = { 
		marketDepth,
		tfc,
	};

	config.plugins.marketDepth = {
		volume: true,
		mountain: true,
		step: true,
		record: true,
		height: "40%",
		precedingContainer: "#marketDepthBookmark"
	};

	config.menuChartPreferences = config.menuChartPreferences.filter(
		(item) => item.label !== "Market Depth" && item.label !== "Extended Hours"
	);

	config.addOns.tableView.coverContainer = ".ciq-chart-area";

	return config;
}


export { getConfig, getCustomConfig };