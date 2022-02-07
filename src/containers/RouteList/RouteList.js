import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';

import "chartiq/css/page-defaults.css"

import HelloWorld from "../HelloWorld/HelloWorld";
import { MultiChartPage } from "../MultiChart";
import CustomChart from "../CustomChart/CustomChart";

import { ChartExample as Chart } from "@chartiq/react-components/Chart"
import AdvancedChart from '@chartiq/react-components/Chart/AdvancedExample'
// import { WorkstationExample as ActiveTrader } from '@chartiq/react-components/ActiveTrader'
// import { ChartExample as CrossSection } from '@chartiq/react-components/CrossSection'
import { CIQ } from "chartiq/js/chartiq"

import './RouteList.css';

const { protocol, pathname } = document.location;
const baseLocation = pathname.replace(/[^/]*$/, "");
const Router = protocol === "file:" ? HashRouter : BrowserRouter;

export default function Routes() {
	return <Router basename={baseLocation}>
			 <Route path='/' exact component={RouteList}></Route>
			 <Route path='/index.html' component={RouteList}></Route>
			 <Route path='/core-chart' component={Chart}></Route>
			 {CIQ.Marker.Performance && <Route path='/technical-analysis' component={AdvancedChart}></Route>}
			 <Route path='/multi-chart' component={MultiChartPage}></Route>
 
			 {CIQ.TFC && CIQ.MarketDepth &&
				 <Route path="/active-trader" component={ActiveTrader}></Route>
			 }
 
			 {CIQ.CrossSection &&
				 <Route path='/term-structure' component={CrossSection}></Route>
			 }
			 <Route path='/custom-chart' component={CustomChart}></Route>
			 <Route path='/hello-world' component={HelloWorld}></Route>
		 </Router>;
 }

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @function RouteList
 */
function RouteList () {
	return (
		<main className='route-list'>
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
				{/* <h3 className="disabled-link" style={{ color: "#888", marginBottom: 0 }}>ActiveTraderWorkstation</h3>
				<p style={{fontSize: 0.75 + "rem", marginTop: 0, marginBottom: 0.70 + "rem"}}>
					(To enable this link, uncomment all lines in the <i>src</i> directory following the <code>// Enable ActiveTraderWorkstation</code> comment.)
				</p>
				Enable ActiveTraderWorkstation */}
					<h3><Link to="active-trader">ActiveTraderWorkstation</Link></h3>
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
				{/* <h3 className="disabled-link" style={{ color: '#888', marginBottom: 0 }}>TermStructure</h3>
				<p style={{fontSize: 0.75 + "rem", marginTop: 0, marginBottom: 0.70 + "rem"}}>
					(To enable this link, uncomment all lines in the <i>src</i> directory following the <code>// Enable TermStructure</code> comment.)
				</p>
					Enable TermStructure */}
					<h3><Link to="term-structure">Term Structure Chart</Link></h3>
				<p>
					Creates a term structure chart for working with non&ndash;time series data.
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
		</main>
	);
}
