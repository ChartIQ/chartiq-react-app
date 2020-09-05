import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import ChartTemplate from "./Template";
// Base styles required by the library to render color correctly.
// If for some reason you are not including base-styles.css add these here.
//import 'chartiq/css/stx-chart.css'; // Chart API
//import 'chartiq/css/chartiq.css'; // Chart UI

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 */
export default class AdvancedChart extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.chartId = props.chartId || "_advanced-chart";
		this.initialSymbol = props.symbol || {
			symbol: "APPL",
			name: "Apple Inc",
			exchDisp: "NASDAQ"
		};

		this.state = {
			chart: new CIQ.UI.Chart(),
			stx: null,
			UIContext: null,
			chartInitializedCallback: props.chartInitialized
		};
	}

	componentDidMount() {
		const container = this.container.current;
		const { chart, chartInitializedCallback } = this.state;
		let { config } = this.props;

		// Update chart configuration by modifying default configuration
		config.chartId = this.chartId;
		config.initialSymbol = this.initialSymbol;
		// config.quoteFeeds[0].behavior.refreshInterval = 0;

		// Hide manu items used by the Active Trader plugin when it is not loaded
		if (!config.plugins.marketDepth) {
			config.menuChartPreferences = config.menuChartPreferences.filter(
				(item) => item.label !== "Market Depth" && item.label !== "L2 Heat Map"
			);
		}

		// Enable any extra addOns here before creating the chart
		// const { tooltip, continuousZoom, outliers } = config.addOns;
		// const activeAddOns = { continuousZoom, outliers, tooltip };
		// config.enabledAddOns = Object.assign(activeAddOns, config.enabledAddOns);

		const uiContext = this.createChartAndUI({ container, config });
		const chartEngine = uiContext.stx;

		this.setState({ stx: chartEngine, UIContext: uiContext });

		if (chartInitializedCallback) {
			chartInitializedCallback({ chartEngine, uiContext });
		}
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		this.state.stx.destroy();
	}

	createChartAndUI({ container, config }) {
		const uiContext = this.state.chart.createChartAndUI({ container, config });

		// Methods for capturing state changes in chart engine and UI

		// Channel subscribe
		// const { channels } = config;
		// const channelSubscribe = CIQ.UI.BaseComponent.prototype.channelSubscribe;
		// channelSubscribe(channels.breakpoint, (value) => {
		// 	console.log('channels.breakpoint',value);
		// }, stx);

		// Create layout listener, see parameters at https://documentation.chartiq.com/global.html#layoutEventListener
		// stx.addEventListener('layout', ({ layout }) => {
		// 	console.log('layout changed', layout);
		// });

		this.postInit(container);

		return uiContext;
	}

	postInit(container) {
		portalizeContextDialogs(container);
	}

	// Return elements for chart plugin toggle buttons
	getPluginToggles() {
		const { tfc } = this.state.stx || {};
		return (
			<div className="trade-toggles ciq-toggles">
				{tfc && (
					<cq-toggle class="tfc-ui sidebar stx-trade" cq-member="tfc">
						<span></span>
						<cq-tooltip>Trade</cq-tooltip>
					</cq-toggle>
				)}
				<cq-toggle
					class="analystviews-ui stx-analystviews tc-ui stx-tradingcentral"
					cq-member="analystviews"
				>
					<span></span>
					<cq-tooltip>Analyst Views</cq-tooltip>
				</cq-toggle>
				<cq-toggle
					class="technicalinsights-ui stx-technicalinsights recognia-ui stx-recognia"
					cq-member="technicalinsights"
				>
					<span></span>
					<cq-tooltip>Technical Insights</cq-tooltip>
				</cq-toggle>
			</div>
		);
	}

	render() {
		const pluginToggles = this.getPluginToggles();

		let chartTemplate = <ChartTemplate pluginToggles={pluginToggles} />;
		if (this.props.children) chartTemplate = this.props.children;

		return <cq-context ref={this.container}>{chartTemplate}</cq-context>;
	}
}

/**
 * For applications that have more then one chart, keep single dialog of the same type
 * and move it outside context node to be shared by all chart components
 */
function portalizeContextDialogs(container) {
	container.querySelectorAll("cq-dialog").forEach((dialog) => {
		dialog.remove();
		if (!dialogPortalized(dialog)) {
			document.body.appendChild(dialog);
		}
	});
}

function dialogPortalized(el) {
	const tag = el.firstChild.nodeName.toLowerCase();
	return Array.from(document.querySelectorAll(tag)).some(
		(el) => !el.closest("cq-context")
	);
}
