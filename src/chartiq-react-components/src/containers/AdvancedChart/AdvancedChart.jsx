import React from "react";

// Import necessary ChartIQ library files
import { CIQ } from "chartiq/js/advanced";
import "chartiq/js/components";
import "chartiq/js/addOns";

import ChartTemplate from "./Template";
// Base styles required by the library to render color correctly.
// If for some reason you are not including base-styles.css add these here.
//import 'chartiq/css/stx-chart.css'; // Chart API
//import 'chartiq/css/chartiq.css'; // Chart UI

export { CIQ };

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

		this.state = {
			stx: null,
			UIContext: null,
			chartInitializedCallback: props.chartInitialized
		};
	}

	componentDidMount() {
		const container = this.container.current;
		const { chartInitializedCallback } = this.state;
		let { config } = this.props;

		portalizeContextDialogs(container);
		// Delay the call to createChartAndUI so any other AdvancedChart components on the page
		// using multi chart setup have a chance to call portalizeContextDialogs
		window.setTimeout(() => {
			const uiContext = this.createChartAndUI({ container, config });
			const chartEngine = uiContext.stx;

			this.setState({ stx: chartEngine, UIContext: uiContext });

			if (chartInitializedCallback) {
				chartInitializedCallback({ chartEngine, uiContext });
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
				{this.props.children || <ChartTemplate config={this.props.config} />}
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
