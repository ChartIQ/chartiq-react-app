import React from "react";

import AdvancedChart, { getConfig, getCustomConfig } from "@chartiq/react-components/Chart/Advanced";

export { getConfig, getCustomConfig }
/**
 * This is an example of two AdvancedChart components on the same page.
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
					<AdvancedChart
						config={config0}
					></AdvancedChart>
				</div>
				<div style={rightColumn}>
					<AdvancedChart
						config={config1}
					></AdvancedChart>
				</div>
			</>
		);
	}
}
