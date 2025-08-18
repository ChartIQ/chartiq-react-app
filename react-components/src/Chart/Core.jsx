import React from "react";

// Import necessary ChartIQ library files
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components";
import "chartiq/js/addOns";

import ChartTemplate from "./Template";

// Base styles required by the library to render color correctly.
import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css"; // Chart API
import "chartiq/css/chartiq.css"; // Chart UI
import "chartiq/css/webcomponents.css";
import "./library-overrides.css";

import { getCustomConfig } from "./resources"; // ChartIQ library resources

import getLicenseKey from "keyDir/key.js";
getLicenseKey(CIQ);

export { CIQ };

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class Core
 * @extends {React.Component}
 */
export default class Core extends React.Component {
	/**
	 * @constructor
	 * @param {object} [props] React props
	 * @param {object} [props.config] Configuration used for the chart.
	 * @param {object} [props.resources] Object of resources passed into configuration to be applied
	 * @param {Core~chartInitialized} [props.chartInitialized] Callback that fires when the chart is created
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
			const uiContext = this.uiContext = (new CIQ.UI.Chart()).createChartAndUI({ container, config });;
			const chartEngine = this.stx = uiContext.stx;

			this.setState({ stx: chartEngine, UIContext: uiContext });

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
	}

	render() {
		this.rendered = true;
		const {
			props: { children },
			config
		} = this;

		let template = <ChartTemplate config={config} />;
		const childrenCount = React.Children.count(children);
		if (childrenCount === 1) {
			template = React.cloneElement(children, { config });
		} else if (childrenCount > 1) {
			template = children;
		}
		return (
			<cq-context ref={this.container}>
				{template}
			</cq-context>
		);
	}
}

/**
 * @callback Core~chartInitialized
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
