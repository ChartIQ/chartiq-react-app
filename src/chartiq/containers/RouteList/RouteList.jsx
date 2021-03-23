import React from 'react';
import { Link } from 'react-router-dom';

import './RouteList.css';

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class RouteList
 * @extends {React.Component}
 */
export default class RouteList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
      <span className="route-list">
        <h2>ChartIQ React Application</h2>

        <p className="description">The chartiq-react-app project is a toolkit of React components.
          The following components create complete charting applications: (Select the component names to
          see the applications.)</p>

        <ul className="top-level">
          <li>
            <h3><Link to="technical-analysis">AdvancedChart</Link></h3>
            <p>
              Creates a chart with a full-featured user interface. AdvancedChartComponent is
              the equivalent of ChartIQ's <i>technical-analysis-chart.html</i> advanced template.
            </p>
          </li>
          <li>
          <h3><Link to="multi-chart">MultiChart</Link></h3>
            <p>
              Displays two advanced chart components side by side in the same document.
            </p>
          </li>
          <li>
            <h3 className="disabled-link" style={{ color: "#888", marginBottom: 0 }}>ActiveTraderWorkstation</h3>
            <p style={{fontSize: 0.75 + "rem", marginTop: 0, marginBottom: 0.70 + "rem"}}>
                (To enable this link, uncomment all lines in the <i>src</i> directory following the <code>// Enable ActiveTraderWorkstation</code> comment.)
            </p>
            {
              /*
              Enable ActiveTraderWorkstation
              <h3><Link to="active-trader">ActiveTraderWorkstation</Link></h3>
              */
            }
            <p>
              Features the advanced chart component enhanced with the following plug-ins:
            </p>
              <ul>
                <li>Trade From Chart</li>
                <li>Order Book</li>
                <li>Trade Book</li>
                <li>Market Depth Chart</li>
              </ul>
          </li>
          <li>
            <h3 className="disabled-link" style={{ color: '#888' }}>CrossSection Chart
              <div>
                <i>
                Note: to activate above route search and uncomment 4 statements in the /src directory following the <br />
                `Enable CrossSection` line
                </i>
              </div>
            </h3>
            {/* Enable CrossSection */}
            {/* <h3><Link to="cross-section">Cross Section Chart</Link></h3> */}
            <p>
              Creates a Cross Section chart that can be used for TermStructures
            </p>
          </li>
          <li>
            <h3><Link to="custom-chart">CustomChart</Link></h3>
            <p>
              Integrates native React components with ChartIQ web components.
            </p>
          </li>
          <li>
            <h3><Link to="hello-world">HelloWorld</Link></h3>
            <p>
              Creates a basic chart with no user interface as a starting point for using the ChartIQ
              API in React.
            </p>
          </li>
        </ul>
      </span>
		);
	}
}
