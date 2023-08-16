import React from "react";
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components";
import "chartiq/plugins/crosssection/core";
import "chartiq/plugins/crosssection/datepicker";
import "chartiq/plugins/crosssection/ui";
import "chartiq/plugins/crosssection/timelineDateSelector";

import "chartiq/plugins/crosssection/crosssection.css";
import "chartiq/plugins/crosssection/datepicker.css";

import ChartTemplate from "./Template";

import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";

import { getCustomConfig } from "./resources"; // ChartIQ library resources

import getLicenseKey from "chartiq/key.js";
getLicenseKey(CIQ);

export { CIQ };

/**
 * An example of a cross section chart for non time series data.
 *
 * @class CrossSection
 * @export
 * @extends {React.Component}
 */
export default class TermStructure extends React.Component {
	/**
	 * @constructor
	 * @param {object} [props] React props
	 * @param {object} [props.config] Configuration used for the chart.
	 * @param {object} [props.resources] Object of resources passed into configuration to be applied
	 * @param {CrossSection~chartInitialized} [props.chartInitialized] Callback that fires when the chart is created
	 */
	constructor(props) {
		super(props);
		const { config, resources } = props;

		this.container = React.createRef();

		const configObj = getCustomConfig({ resources });
		CIQ.extend(configObj, config);
		this.config = configObj;

		this.stx = null;
		this.uiContext = null;
	}

	componentDidMount() {
		if (this.init) return;
		const container = this.container.current;
		const { chartInitialized } = this.props;
		const { config } = this;

		window.setTimeout(() => {
			const uiContext = this.uiContext = new CIQ.UI.Chart().createChartAndUI({
				container,
				config
			});
			const chartEngine = this.stx = uiContext.stx;

			if (chartInitialized) {
				chartInitialized({ chartEngine, uiContext });
			}
		}, 0);
		this.init = true;
		this.rendered = false;
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		if (!this.stx || !this.rendered) return;

		this.stx.destroy();
		this.stx.draw = () => {};
		this.stx = null;
	}

	render() {
		this.rendered = true;
		return (
			<cq-context ref={this.container}>
				{this.props.children || <ChartTemplate />}
			</cq-context>
		);
	}
}

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