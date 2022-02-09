import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';

import "chartiq/css/page-defaults.css"

import HelloWorld from "../HelloWorld/HelloWorld";
import { MultiChartPage } from "../MultiChart";
import CustomChart from "../CustomChart/CustomChart";

import { ChartExample as Chart } from "@chartiq/react-components/Chart"
// import AdvancedChart from '@chartiq/react-components/Chart/AdvancedExample'
// import { WorkstationExample as ActiveTrader } from '@chartiq/react-components/ActiveTrader'
// import { ChartExample as CrossSection } from '@chartiq/react-components/CrossSection'
import { CIQ } from "chartiq/js/chartiq"

import MissingFeature from '../MissingFeature'

import './Router.css';

const { protocol, pathname } = document.location;
const baseLocation = pathname.replace(/[^/]*$/, "");
const Router = protocol === "file:" ? HashRouter : BrowserRouter;

const taEnabled = !!CIQ.Marker.Performance
const ActiveTraderEnabled = !!CIQ.TFC && !!CIQ.MarketDepth;
const CrossSectionEnabled = !!CIQ.CrossSection;

console.log(`Check Technical Analysis package: ${taEnabled}`)
console.log(`Check ActiveTrader plugin: ${ActiveTraderEnabled}`);
console.log(`Check CrossSection plugin: ${CrossSectionEnabled}`);

export default function Routes() {
	return <Router basename={baseLocation}>
			<Route path='/' exact component={RouteList}></Route>
			<Route path='/index.html' component={RouteList}></Route>
			<Route path='/core-chart' component={Chart}></Route>
				
			<Route path='/technical-analysis' component={AdvancedChartComponent}></Route>

			<Route path='/multi-chart' component={MultiChartPage}></Route>

			<Route path="/active-trader" component={WorkstationComponent}></Route>
 
			<Route path='/term-structure' component={CrossSectionComponent}></Route>
			<Route path='/cross-section' component={CrossSectionComponent}></Route>

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
				<h3 title='Requires Technical Analsysis Package'><Link to="technical-analysis">AdvancedChart</Link></h3>
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
				<h3 title='Requires ActiveTrader and TFC plugins'><Link to="active-trader">ActiveTrader Workstation</Link></h3>
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
				<h3 title='Requires CrossSection plugin'><Link to='term-structure'>CrossSection (formerly TermStructure)</Link></h3>
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

function AdvancedChartComponent() {
	return taEnabled
		? <AdvancedChart />
		: <MissingFeature feature={'Technical Analysis'} type={'package'} />
}

function WorkstationComponent() {
	return ActiveTraderEnabled
		? <Workstation />
		: <MissingFeature feature={'ActiveTrader'} type={'plugin'} />
}

function CrossSectionComponent() {
	return CrossSectionEnabled 
		? <CrossSection /> 
		: <MissingFeature feature={'CrossSection'} type={'plugin'} />
}
