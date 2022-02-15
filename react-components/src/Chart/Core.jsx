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
			const uiContext = this.createChartAndUI({ container, config });
			const chartEngine = uiContext.stx;

			this.setState({ stx: chartEngine, UIContext: uiContext });

			if (chartInitialized) {
				chartInitialized({ chartEngine, uiContext });
			}
		}, 0);
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		const { stx } = this.state;
		stx.destroy();
		stx.draw = () => {};
	}

	createChartAndUI({ container, config }) {
		return new CIQ.UI.Chart().createChartAndUI({ container, config });
	}

	render() {
		return (
			<cq-context ref={this.container}>
				{this.props.children || <ChartTemplate config={this.config} />}
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
