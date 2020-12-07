import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import ChartTemplate from "./Template";
const { channelWrite } = CIQ.UI.BaseComponent.prototype;

/**
 * This is a fully functional example showing how to load a chart with the Active Trader plugin and UI.
 *
 * @export
 * @class ActiveTraderWorkstation
 * @extends {React.Component}
 */
export default class ActiveTraderWorkstation extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.chartId = props.chartId || "_active-trader-chart";
		this.initialSymbol = "^USDAUD";

		this.chart = new CIQ.UI.Chart();
		this.stx = null;
		this.UIContext = null;
	}

	componentDidMount() {
		const container = this.container.current;
		const { config } = this.props;

		// Update chart configuration by modifying default configuration
		config.chartId = this.chartId;
		config.initialSymbol = this.initialSymbol;
		// config.quoteFeeds[0].behavior.refreshInterval = 0;
		if (props.onChartReady) config.onChartReady = props.onChartReady;

		// Enable any extra addOns here before creating the chart
		// const { tooltip, continuousZoom, outliers } = config.addOns;
		// const activeAddOns = { continuousZoom, outliers, tooltip };
		// config.enabledAddOns = Object.assign(activeAddOns, config.enabledAddOns);

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

		config.addOns.tableView.coverContainer = "#mainChartGroup .chartContainer";

		const uiContext = (this.UIContext = this.chart.createChartAndUI({
			container,
			config
		}));
		const chartEngine = (this.stx = uiContext.stx);

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

		if (window["d3"]) {
			this.cryptoSetup(uiContext.stx);
		} else {
			CIQ.loadScript("https://d3js.org/d3.v5.min.js", () => {
				this.cryptoSetup(uiContext.stx);
			});
		}

		// Request TFC channel open
		channelWrite(config.channels.tfc, true, uiContext.stx);

		if (this.props.chartInitializedCallback) {
			this.props.chartInitializedCallback({ chartEngine, uiContext });
		}
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		this.stx.moneyFlowChart.destroy();
		this.stx.destroy();
	}

	cryptoSetup(stx) {
		stx.setChartType("line");
		CIQ.extend(stx.layout, {
			crosshair: true,
			headsUp: "static",
			l2heatmap: true,
			rangeSlider: true,
			marketDepth: true,
			extended: false
		});
		stx.changeOccurred("layout");

		// Simulate L2 data using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
		CIQ.simulateL2({ stx, onInterval: 1000, onTrade: true });

		stx.moneyFlowChart = moneyFlowChart(stx);

		function moneyFlowChart(stx) {
			const initialPieData = {
				Up: { index: 1 },
				Down: { index: 2 },
				Even: { index: 3 }
			};

			const pieChart = new CIQ.Visualization({
				container: "cq-tradehistory-table div[pie-chart] div",
				renderFunction: CIQ.SVGChart.renderPieChart,
				colorRange: ["#8cc176", "#b82c0c", "#7c7c7c"],
				className: "pie",
				valueFormatter: CIQ.condenseInt
			}).updateData(CIQ.clone(initialPieData));

			let last = null;
			stx.append("updateCurrentMarketData", function (
				data,
				chart,
				symbol,
				params
			) {
				if (symbol) return;
				const items = document.querySelectorAll("cq-tradehistory-body cq-item");
				var d = {};
				for (var i = 0; i < items.length; i++) {
					const item = items[i];
					if (item === last) break;
					var dir = item.getAttribute("dir");
					if (!dir) dir = "even";
					dir = CIQ.capitalize(dir);
					if (!d[dir]) d[dir] = 0;
					d[dir] += parseFloat(
						item.querySelector("[col=amount]").getAttribute("rawval")
					);
				}
				if (i) pieChart.updateData(d, "add");
				last = items[0];
			});
			stx.addEventListener("symbolChange", function (obj) {
				pieChart.updateData(CIQ.clone(initialPieData));
			});
			return pieChart;
		}
	}

	render() {
		let chartTemplate = <ChartTemplate />;
		if (this.props.children) chartTemplate = this.props.children;

		return <cq-context ref={this.container}>{chartTemplate}</cq-context>;
	}
}
