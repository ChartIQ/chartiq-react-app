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
		const { chart0 = {}, chart1 = {} } = this.props;
		const {
			symbol: symbol0,
			chartId: id0,
			chartInitialized: initialized0,
			config: config0
		} = chart0;
		const {
			symbol: symbol1,
			chartId: id1,
			chartInitialized: initialized1,
			config: config1
		} = chart1

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
						chartId={id0 || 'chart0'}
						chartInitialized={initialized0}
						config={config0}
						symbol={symbol0 || 'AAPL' }
					></AdvancedChart>
				</div>
				<div style={rightColumn}>
					<AdvancedChart
						chartId={id1 || 'chart1'}
						chartInitialized={initialized1}
						config={config1}
						symbol={symbol1 || 'MSFT' }
					></AdvancedChart>
				</div>
			</>
		);
	}
}
