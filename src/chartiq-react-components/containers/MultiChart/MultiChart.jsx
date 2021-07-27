import React from "react";

import { default as AdvancedChart } from "../AdvancedChart";

/**
 * This is an example of two AdvancedChart components on the same page.
 *
 * @export
 * @class MultiChart
 * @extends {React.Component}
 */
export default class MultiChart extends React.Component {
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
						chartId="chart0"
						symbol="AAPL"
					></AdvancedChart>
				</div>
				<div style={rightColumn}>
					<AdvancedChart
						chartId="chart1"
						symbol="MSFT"
					></AdvancedChart>
				</div>
			</>
		);
	}
}
