import React, { useRef, useEffect, useState } from "react";
import "chartiq/js/standard";
import { CIQ } from "chartiq/js/components";

import "chartiq/js/extras/svgcharts/piechart";

// Crypto, L2 Heat Map, Market Depth,
import "chartiq/plugins/activetrader/cryptoiq";
import "chartiq/plugins/activetrader/cryptoiq.css";

// TFC plugin
import "chartiq/plugins/tfc/tfc-loader";
import "chartiq/plugins/tfc/tfc.css";

import ChartTemplate from "./Template";

import "./Workstation.css";
import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";
import "chartiq/css/webcomponents.css";

import "./library-overrides.css";

import { getCustomConfig } from "./resources"; // ChartIQ library resources
const { channelWrite } = CIQ.UI.BaseComponent.prototype;

import getLicenseKey from "keyDir/key.js";
getLicenseKey(CIQ);

export { CIQ };

/**
 * This is a fully functional example showing how to load a chart with the Active Trader plugin and UI.
 * @param {object} [props] React props
 * @param {object} [props.config] Configuration used for the chart.
 * @param {object} [props.resources] Object of resources passed into configuration to be applied
 * @param {Workstation~chartInitialized} [props.chartInitialized] Callback that fires when the chart is created
 */
export default function Workstation(props) {
	const container = useRef(null);
	const initialized = useRef(false);
	let configObj;

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		if (!container.current) return;
		configObj = getCustomConfig({ resources: props.resources });
		CIQ.extend(configObj, props.config);

		const uiContext = new CIQ.UI.Chart().createChartAndUI({
			container: container.current,
			config: configObj
		});
		const stx = uiContext.stx;

		setupCrypto(stx);

		if (window.d3) setupMoneyFlowChart(stx);
		else
			CIQ.loadScript("https://d3js.org/d3.v5.min.js", () =>
				setupMoneyFlowChart(stx)
			);

		if (configObj.channels?.tfc)
			channelWrite(configObj.channels.tfc, true, stx);

		if (props.chartInitialized)
			props.chartInitialized({ chartEngine: stx, uiContext });

		return () => {
			// Destroy the ChartEngine instance when unloading the component.
			if (stx.moneyFlowChart) stx.moneyFlowChart.destroy();
			stx.destroy();
		};
	}, []);

	let chartTemplate = <ChartTemplate config={configObj} />;
	if (props.children) chartTemplate = props.children;

	function setupCrypto(stx) {
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

		// Simulate L2 market data
		CIQ.simulateL2({ stx, onInterval: 1000, onTrade: true });
	}

	function setupMoneyFlowChart(stx) {
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
		stx.append("updateCurrentMarketData", function () {
			const items = document.querySelectorAll("cq-tradehistory-body cq-item");
			if (!items) return;
			const d = {};
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item === last) break;
				let dir = item.getAttribute("dir") || "even";
				dir = CIQ.capitalize(dir);
				d[dir] =
					(d[dir] || 0) +
					parseFloat(item.querySelector("[col=amount]").getAttribute("rawval"));
			}
			if (Object.keys(d).length) pieChart.updateData(d, "add");
			last = items[0];
		});

		stx.addEventListener("symbolChange", () =>
			pieChart.updateData(CIQ.clone(initialPieData))
		);
		stx.moneyFlowChart = pieChart;
	}

	return <cq-context ref={container}>{chartTemplate}</cq-context>;
}

/**
 * @callback Workstation~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */

// Adjustments to compensate for when webpack config is not available
(function initDynamicShare() {
	// Decorate the library function to avoid copying html2canvas.min.js to distribution to js/thirdparty directory
	if (CIQ.Share.fullChart2PNG_init) return;
	const fullChart2PNG = CIQ.Share.fullChart2PNG;
	CIQ.Share.fullChart2PNG = function (stx, params, cb) {
		import("chartiq/js/thirdparty/html2canvas.min.js").then(() => {
			fullChart2PNG(stx, params, cb);
		});
	};
	CIQ.Share.fullChart2PNG_init = true;
})();
