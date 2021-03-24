// Required imports from chartiq for advanced chart
import "chartiq/js/standard.js";
import { CIQ } from "chartiq/js/components.js";
import "chartiq/plugins/crosssection/core.js";
import "chartiq/plugins/crosssection/datepicker.js";
import "chartiq/plugins/crosssection/ui.js";
import "chartiq/examples/feeds/termstructureDataSimulator.js";

import "chartiq/plugins/crosssection/sample.css"
/* Template-specific imports */
import defaultConfig from "chartiq/js/defaultConfiguration.js";

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

import quoteFeed from "chartiq/examples/feeds/quoteFeedSimulator.js";
import "chartiq/examples/feeds/symbolLookupChartIQ.js";

import "chartiq/examples/markets/marketDefinitionsSample.js";
import "chartiq/examples/markets/marketSymbologySample.js";

// Creates a complete customised configuration object
function getConfig() { 
	return defaultConfig({
		quoteFeed,
		// forecastQuoteFeed, // uncomment to enable forecast quote feed simulator
		scrollStyle: PerfectScrollbar,
	});
}

// Creates a complete customised configuration object
function getCustomConfig({ chartId, symbol, onChartReady } = {}) {
	const config = getConfig();

	config.enabledAddOns.rangeSlider = false;
	config.enabledAddOns.shortcuts = false;

	config.initialSymbol = "US-T BENCHMARK";
	config.menuYaxisField = [
		{ type: "item", label: "Yield", cmd: "Layout.setYaxisField('yield')" },
		{ type: "item", label: "Bid", cmd: "Layout.setYaxisField('bid')" },
		{ type: "item", label: "Mid", cmd: "Layout.setYaxisField('mid')" },
		{ type: "item", label: "Ask", cmd: "Layout.setYaxisField('ask')" }
	];
	config.menuChartPreferences = [
		{ type: "checkbox", label: "Shading", cmd: "Layout.Shading()" },
		{ type: "checkbox", label: "X-Axis Scaling", cmd: "Layout.XAxisScaling()" },
		{
			type: "checkbox",
			label: "Update Animations",
			cmd: "Layout.UpdateAnimations()"
		},
		{ type: "checkbox", label: "Show Update Stamp", cmd: "Layout.UpdateStamp()" },
		{
			type: "checkboxOptions",
			label: "Recent Updates",
			cmd: "Layout.FreshPoints()",
			options: "Layout.showFreshnessEdit()"
		}
	];

	// Update chart configuration by modifying default configuration
	config.chartId = chartId || "_cross-section-chart";

	// config.quoteFeeds[0].behavior.refreshInterval = 0; // disables quotefeed refresh
	config.onChartReady = onChartReady;

	const { crossSection } = config.plugins;
	// Select only plugin configurations that needs to be active for this chart
	config.plugins = {
		crossSection
	};

	// Enable / disable addOns
	// config.enabledAddOns.tooltip = false;
	// config.enabledAddOns.continuousZoom = true;

	return config;
}

export { CIQ, getConfig, getCustomConfig };
