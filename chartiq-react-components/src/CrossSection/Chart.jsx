import React from "react";
import { CIQ } from "chartiq/js/standard";
import "chartiq/js/components"
import "chartiq/plugins/crosssection/core";
import "chartiq/plugins/crosssection/datepicker";
import "chartiq/plugins/crosssection/ui";
import "chartiq/plugins/crosssection/timelineDateSelector";

import "chartiq/plugins/crosssection/crosssection.css"
import "chartiq/plugins/crosssection/datepicker.css"

import ChartTemplate from "./Template";

import 'chartiq/css/normalize.css';
import 'chartiq/css/stx-chart.css';
import 'chartiq/css/chartiq.css'
export { CIQ }

/**
 * An example of a term structure chart.
 *
 * @class TermStructure
 * @export
 * @extends {React.Component}
 * @param {object} config Configuration used for the chart.
 * @param {object} resources Object of resources passed into configuration to be applied
 * @param {TermStructure~chartInitialized} chartInitialized Callback that fires when the chart is interactive
 */
export default class TermStructure extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();

		this.state = {
			stx: null,
			UIContext: null,
		};
	}

	componentDidMount() {
		const container = this.container.current;
		const { chartInitialized } = this.props
		let { config } = this.props;

		window.setTimeout(() => {
			const uiContext = new CIQ.UI.Chart().createChartAndUI({ container, config });
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

	render() {
		return (
			<cq-context ref={this.container}>
				{this.props.children || <ChartTemplate />}
			</cq-context>
		);
	}
}

/**
 * @callback TermStructure~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */