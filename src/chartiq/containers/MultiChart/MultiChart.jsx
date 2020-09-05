import React from "react";

import { config } from "../AdvancedChart/resources"; // ChartIQ library resources
import { default as AdvancedChart } from "../AdvancedChart/AdvancedChart";

/**
 * This is an example of two AdvancedChart comonents on the same page.
 *
 * @export
 * @class MultiChart
 * @extends {React.Component}
 */
export default class MultiChart extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const leftColumn = {
			height: "100%",
			position: "absolute",
			width: "50%"
		};
		const rightColumn = {
			height: "100%",
			position: "absolute",
			width: "50%",
			left: "50%"
		};

		return (
			<>
				<div style={leftColumn}>
					<AdvancedChart
						config={config}
						chartId="chart0"
						symbol="AAPL"
					></AdvancedChart>
				</div>
				<div style={rightColumn}>
					<AdvancedChart
						config={config}
						chartId="chart1"
						symbol="MSFT"
					></AdvancedChart>
				</div>
			</>
		);
	}
}
