import React from 'react';

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
        <div style={leftColumn}><cq-advanced-chart chartId="chart0" symbol="AAPL"></cq-advanced-chart></div>
        <div style={rightColumn}><cq-advanced-chart chartId="chart1" symbol="MSFT"></cq-advanced-chart></div>
      </>
		);
	}
}
