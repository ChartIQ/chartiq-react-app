import React from 'react';
import { default as AdvancedChart } from '../AdvancedChart/AdvancedChart';

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
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
      height: '100%',
      position: 'absolute',
	    width: '50%'
    };
    const rightColumn = {
      height: '100%',
      position: 'absolute',
      width: '50%',
      left: '50%'
    };

		return (
      <>
        <div style={leftColumn}><AdvancedChart chartId="chart0" symbol="AAPL"></AdvancedChart></div>
        <div style={rightColumn}><AdvancedChart chartId="chart1" symbol="MSFT"></AdvancedChart></div>
      </>
		);
	}
}
