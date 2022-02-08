import React from "react";
import "chartiq/js/advanced"
import { CIQ } from "chartiq/js/components";

import "chartiq/js/extras/svgcharts/piechart";

// Crypto, L2 Heat Map, Market Depth,
import 'chartiq/plugins/activetrader/cryptoiq';
import 'chartiq/plugins/activetrader/cryptoiq.css'

// TFC plugin
import 'chartiq/plugins/tfc/tfc-loader';
import 'chartiq/plugins/tfc/tfc.css';

import ChartTemplate from "./Template";

import './Workstation.css'
import 'chartiq/css/normalize.css';
import 'chartiq/css/stx-chart.css';
import 'chartiq/css/chartiq.css'

import './library-overrides.css'

import { getCustomConfig } from "./resources"; // ChartIQ library resources
const { channelWrite } = CIQ.UI.BaseComponent.prototype;

export { CIQ }
/**
 * This is a fully functional example showing how to load a chart with the Active Trader plugin and UI.
 *
 * @export
 * @class Workstation
 * @extends {React.Component}
 */
export default class Workstation extends React.Component {
	/**
	 * @constructor
	 * @param {object} [props] React props
	 * @param {object} [props.config] Configuration used for the chart.
	 * @param {object} [props.resources] Object of resources passed into configuration to be applied
	 * @param {Workstation~chartInitialized} [props.chartInitialized] Callback that fires when the chart is created
	 */
	constructor(props) {
		super(props);
		const { config, resources } = props;

		this.container = React.createRef();

		const configObj = getCustomConfig({ resources });
		CIQ.extend(configObj, config);
		this.config = configObj;

		this.stx = null;
		this.UIContext = null;
	}

	componentDidMount() {
		const container = this.container.current;
		const { chartInitialized } = this.props;
		const { config } = this;

		const uiContext = (this.UIContext = new CIQ.UI.Chart().createChartAndUI({
			container,
			config
		}));
		const chartEngine = (this.stx = uiContext.stx);

		this.cryptoSetup(uiContext.stx);

		if (window["d3"]) {
			this.setUpMoneyFlowChart(uiContext.stx);
		} else {
			CIQ.loadScript("https://d3js.org/d3.v5.min.js", () => {
				this.setUpMoneyFlowChart(uiContext.stx);
			});
		}

		// Request TFC channel open
		channelWrite(config.channels.tfc, true, uiContext.stx);

		if (chartInitialized) {
			chartInitialized({ chartEngine, uiContext });
		}
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		this.stx.moneyFlowChart.destroy();
		this.stx.destroy();
		this.stx.draw = () => {};
	}

	cryptoSetup(stx) {
		stx.setChartType("line");
		CIQ.extend(stx.layout, {
			crosshair: true,
			headsUp: { static: true },
			l2heatmap: true,
			rangeSlider: true,
			marketDepth: true,
			extended: false
		});
		stx.changeOccurred("layout");

		// Simulate L2 data using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
		CIQ.simulateL2({ stx, onInterval: 1000, onTrade: true });
	}

	setUpMoneyFlowChart(stx) {
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
		let chartTemplate = <ChartTemplate config={this.config} />;
		if (this.props.children) chartTemplate = this.props.children;

		return <cq-context ref={this.container}>{chartTemplate}</cq-context>;
	}
}
/**
 * @callback Workstation~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */