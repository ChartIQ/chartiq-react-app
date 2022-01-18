import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import "chartiq/js/extras/svgcharts/piechart";

// Crypto, L2 Heat Map, Market Depth,
import 'chartiq/plugins/activetrader/cryptoiq';

// TFC plugin
import 'chartiq/plugins/tfc/tfc-loader';

import ChartTemplate from "./Template";
const { channelWrite } = CIQ.UI.BaseComponent.prototype;

export { CIQ }
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
		this.stx = null;
		this.UIContext = null;
	}

	componentDidMount() {
		const container = this.container.current;
		const { config, chartInitialized } = this.props;

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
		let chartTemplate = <ChartTemplate />;
		if (this.props.children) chartTemplate = this.props.children;

		return <cq-context ref={this.container}>{chartTemplate}</cq-context>;
	}
}
