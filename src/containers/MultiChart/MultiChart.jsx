import React from "react";

import { getConfig, getCustomConfig, ChartExample as Chart } from "@chartiq/react-components/Chart";

export { getConfig, getCustomConfig }
/**
 * This is an example of two Chart components on the same page.
 *
 * @export
 * @class MultiChart
 * @extends {React.Component}
 */
export default class MultiChart extends React.Component {
	render() {
		const { configs = [] } = this.props;

		const [config0, config1] = configs;

		if(!config0.id) config0.chartId = 'chart0';
		if(!config1.id) config1.chartId = 'chart1';

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
					<Chart
						config={config0}
					></Chart>
				</div>
				<div style={rightColumn}>
					<Chart
						config={config1}
					></Chart>
				</div>
			</>
		);
	}
}
