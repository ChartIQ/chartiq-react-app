import React from "react";

// Import necessary ChartIQ library files
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components";
import "chartiq/js/addOns";

import ChartTemplate from "./TemplateMulti";

// Base styles required by the library to render color correctly.
import "chartiq/css/normalize.css";
import "chartiq/css/stx-chart.css"; // Chart API
import "chartiq/css/chartiq.css"; // Chart UI
import "./library-overrides.css";

import { getCustomConfig } from "./resources"; // ChartIQ library resources

export { CIQ };

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class Core
 * @extends {React.Component}
 */
export default class Multi extends React.Component {
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

		this.state = {
			stx: null,
			UIContext: null
		};
	}

	componentDidMount() {
		const container = this.container.current;
		const { chartInitialized } = this.props;
		const { config } = this;

		portalizeContextDialogs(container);
		// Delay the call to createChartAndUI so any other chart components on the page
		// using multi chart setup have a chance to call portalizeContextDialogs
		window.setTimeout(() => {
			const chartEntries = [{ symbol: "IBM" }, { symbol: "AAPL" }];
			const store = new CIQ.NameValueStore();
			config.multiChartId = "_ciq";
			store.get("multiCharts" + config.multiChartId, (err, chartConfig) => {
				const {
					charts = chartEntries,
					colCount = 2,
					rowCount = 1,
					gridTemplate
				} = chartConfig || {};

				const stxArr = new CIQ.UI.Multichart().createCharts(
					{
						chartsConfig: {
							charts,
							colCount,
							rowCount,
							gridTemplate
						}
					},
					config
				);
				// add allCharts property
				Object.defineProperty(container, "charts", {
					get: function () {
						return container
							.getCharts()
							.filter(
								({ container }) => !container.hasAttribute("cq-context-engine")
							).reverse();
					}
				});

				this.chartContainer = container;

				if (chartInitialized) {
					chartInitialized({ chartContainer: container });
				}
				Object.assign(window, { CIQ, stxArr });
			});
		}, 0);
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instances when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		const { stx } = this.state;
		if (!this.container) return;

		(this.chartContainer.charts || []).forEach((stx) => {
			stx.destroy();
			stx.draw = () => {};
		})
	}

	render() {
		const {
			props: { children },
			config
		} = this;

		return (
			<cq-context ref={this.container} cq-hide-menu-periodicity="">
				{(children && React.cloneElement(children, { config })) || (
					<ChartTemplate config={config} />
				)}
			</cq-context>
		);
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
	let result = Array.from(document.querySelectorAll(tag)).some(
		(el) => !el.closest("cq-context")
	);
	return result;
}

/**
 * @callback Core~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */

// Adjustments to compensate for when webpack config is not available
(function initDynamicShare() {
	// Decorate the library function to avoid copying html2canvas.min.js to distribution to js/thirdparty directory
	const fullChart2PNG = CIQ.Share.fullChart2PNG;
	CIQ.Share.fullChart2PNG = function (stx, params, cb) {
		import("chartiq/js/thirdparty/html2canvas.min.js").then(() => {
			fullChart2PNG(stx, params, cb);
		});
	};
})();
