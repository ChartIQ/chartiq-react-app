import "chartiq/examples/feeds/symbolLookupChartIQ";
import quoteFeed from "chartiq/examples/feeds/termstructureDataSimulator";
import defaultConfig from "chartiq/js/defaultConfiguration";


// Creates a complete customised configuration object
function getConfig(resources = {}) {
	if(!resources.quoteFeed && resources.quoteFeed!== null ) resources.quoteFeed = quoteFeed
	return defaultConfig({ ...resources, deprecatedSettings: true });
}

// Creates a complete customised configuration object
function getCustomConfig({ chartId, symbol, onChartReady, resources } = {}) {
	const config = getConfig(resources);

	config.enabledAddOns.rangeSlider = false;
	config.enabledAddOns.shortcuts = false;

	config.initialSymbol = symbol || symbol === "" ? symbol : "US-T BENCHMARK";
	config.chartId = chartId || "_cross-section-chart";

	if (onChartReady) config.onChartReady = onChartReady;

	config.menus.menuYaxisField = {
		content: [
			{ type: "item", label: "Yield", tap: "Layout.setYaxisField('yield')" },
			{ type: "item", label: "Bid", tap: "Layout.setYaxisField('bid')" },
			{ type: "item", label: "Mid", tap: "Layout.setYaxisField('mid')" },
			{ type: "item", label: "Ask", tap: "Layout.setYaxisField('ask')" }
		]
	};
	config.menus.menuChartPreferences = {
		content: [
			{ type: "heading", label: "Options" },
			{ type: "switch", label: "Shading", setget: "Layout.Shading()" },
			{
				type: "switch",
				label: "X-Axis Scaling",
				setget: "Layout.XAxisScaling()"
			},
			{
				type: "switch",
				label: "Update Animations",
				setget: "Layout.UpdateAnimations()"
			},
			{
				type: "switch",
				label: "Show Update Stamp",
				setget: "Layout.UpdateStamp()"
			},
			{
				type: "switch",
				label: "Recent Updates",
				setget: "Layout.FreshPoints()",
				options: "Layout.showFreshnessEdit()"
			},
			{
				type: "switch",
				label: "Timeline Date Selector",
				setget: "Layout.TimelineDateSelector()"
			},
			{ type: "separator" },
			{ type: "heading", label: "Themes" },
			{ type: "component", value: "cq-themes", menuPersist: true }
		]
	};

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

export { getConfig, getCustomConfig };
