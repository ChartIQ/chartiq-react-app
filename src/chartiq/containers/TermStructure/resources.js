// Required imports from chartiq for advanced chart
import "chartiq/js/standard";
import { CIQ } from "chartiq/js/components";
import "chartiq/plugins/crosssection/core";
import "chartiq/plugins/crosssection/datepicker";
import "chartiq/plugins/crosssection/ui";
import "chartiq/plugins/crosssection/timelineDateSelector";
import quoteFeed from "chartiq/examples/feeds/termstructureDataSimulator";

import "chartiq/plugins/crosssection/sample.css"
/* Template-specific imports */
import defaultConfig from "chartiq/js/defaultConfiguration";

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

import "chartiq/examples/feeds/symbolLookupChartIQ";

import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";

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

	config.initialSymbol = symbol || symbol === "" ? symbol : "US-T BENCHMARK";
	config.chartId = chartId || "_cross-section-chart";
	
	if (onChartReady) config.onChartReady = onChartReady;
		// config.quoteFeeds[0].behavior.refreshInterval = 0; // disables quotefeed refresh

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
		},
		{
			type: "checkbox",
			label: "Timeline Date Selector",
			cmd: "Layout.TimelineDateSelector()"
		}

	];

	config.plugins.crossSection.sortFunction = (l, r) => {
		let weight = ["DY", "WK", "MO", "YR", "ST", "MT", "LT"];
		let l1 = l.split(" "),
			r1 = r.split(" ");
		let diff =
			weight.indexOf(l1[l1.length - 1]) - weight.indexOf(r1[r1.length - 1]);
		if (diff) return diff > 0 ? 1 : -1;
	
		if (isNaN(l1[0])) return 1;
		if (isNaN(r1[0])) return -1;
		if (Number(l1[0]) < Number(r1[0])) return -1;
		if (Number(r1[0]) < Number(l1[0])) return 1;
		return 0;
	};

	const { crossSection } = config.plugins;
	// Select only plugin configurations that needs to be active for this chart
	config.plugins = {
		crossSection
	};

	return config;
}

export { CIQ, getConfig, getCustomConfig };
