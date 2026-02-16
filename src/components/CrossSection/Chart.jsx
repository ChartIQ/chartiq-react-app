import React, { useEffect, useRef, useState } from "react";
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components";

import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";
import "chartiq/css/webcomponents.css";

import "chartiq/plugins/crosssection/core";
import "chartiq/plugins/crosssection/components/legendCrossplot.js";
import "chartiq/plugins/crosssection/datepicker";
import "chartiq/plugins/crosssection/ui";
import "chartiq/plugins/crosssection/timelineDateSelector";

import ChartTemplate from "./Template";

import { getCustomConfig } from "./resources"; // ChartIQ library resources

import getLicenseKey from "keyDir/key.js";
getLicenseKey(CIQ);

export { CIQ };

/**
 * An example of a cross section chart for non time series data.
 *
 * @class CrossSection
 * @export
 * @extends {React.Component}
 */
const TermStructure = ({ config = {}, resources = {}, chartInitialized, children }) => {
	const container = useRef(null);
	const initialized = useRef(false);
	let configObj;

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		if (!container.current) return;
		let chartEngine, uiContext;

		configObj = getCustomConfig({ resources });
		CIQ.extend(configObj, config);

		const initChart = async () => {
			uiContext = new CIQ.UI.Chart().createChartAndUI({
				container: container.current,
				config: configObj
			});
			chartEngine = uiContext.stx;

			if (chartInitialized) {
				chartInitialized({ chartEngine, uiContext });
			}
		};

		initChart();

		return () => {
			// Destroy the ChartEngine instance when unloading the component.
			// This will stop internal processes such as quotefeed polling.
			if (chartEngine) {
				chartEngine.destroy();
				chartEngine.draw = () => {};
			}
		};
	}, []);

	let template = <ChartTemplate config={configObj} />;
	const childrenCount = React.Children.count(children);
	if (childrenCount === 1) {
		template = React.cloneElement(children, { config });
	} else if (childrenCount > 1) {
		template = children;
	}

	return <cq-context ref={container}>{template}</cq-context>;
};

/**
 * @callback CrossSection~chartInitialized
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

export default TermStructure;