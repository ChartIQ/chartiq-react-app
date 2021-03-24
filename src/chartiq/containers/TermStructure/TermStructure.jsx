import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import ChartTemplate from "./Template";

/**
 * TermStructure Chart
 *
 * @export
 * @class TermStructure
 * @extends {React.Component}
 */
export default class TermStructure extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();

		this.state = {
			chart: new CIQ.UI.Chart(),
			stx: null,
			UIContext: null,
			chartInitializedCallback: props.chartInitialized
		};
	}

	componentDidMount() {
		const container = this.container.current;
		const { chartInitializedCallback } = this.state;
		let { config } = this.props;

		window.setTimeout(() => {
			const uiContext = this.createChartAndUI({ container, config });
			const chartEngine = uiContext.stx;

			this.setState({ stx: { chartEngine, UIContext: uiContext } });

			if (chartInitializedCallback) {
				chartInitializedCallback({ chartEngine, uiContext });
			}
		}, 0);
	}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		this.state.stx.destroy();
	}

	createChartAndUI({ container, config }) {
		const uiContext = this.state.chart.createChartAndUI({ container, config });
		return uiContext;
	}

	render() {
		return (
			<cq-context ref={this.container}>
				{this.props.children || <ChartTemplate />}
			</cq-context>
		);
	}
}
