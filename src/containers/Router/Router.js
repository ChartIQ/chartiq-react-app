import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";

import "chartiq/css/page-defaults.css";

import HelloWorld from "../HelloWorld/HelloWorld.jsx";
import MultiChartExample from "../MultiChart/MultiExample.jsx";
import CustomChart from "../CustomChart/CustomChart.jsx";

import { ChartExample } from "@chartiq/react-components/Chart";
import MissingFeature from "../MissingFeature.js";

import "./Router.css";

const Chart = ({ config }) => {
	const [resolved, setResolved] = useState(false);

	useEffect(() => {
		// Preload advance and related modules prior invoking ChartExample if available
		// to upgrade ChartExample to AdvancedExample equivalent
		Promise.allSettled([
			import("chartiq/js/advanced.js"),
			import("chartiq/plugins/signaliq/signaliqDialog"),
			import("chartiq/plugins/signaliq/signaliq-marker"),
			import("chartiq/plugins/signaliq/signaliq-paintbar"),
			import("chartiq/plugins/studybrowser")
		])
			.then((modules) => {
				// TA markers require highPerformance markers available in advanced.js
				if (modules[0].status !== "rejected") import("chartiq/examples/markers/tradeAnalyticsSample");
				setResolved(true);
				return modules;
			})
			.catch(() => setResolved(true));
	}, []);

	return resolved ? <ChartExample config={config} /> : null;
};

let ActiveTrader = () => (
	<MissingFeature feature={"ActiveTrader"} type={"plugin"} />
);
let Crosssection = () => (
	<MissingFeature feature={"Crosssection"} type={"plugin"} />
);

const { protocol, pathname } = document.location;
const baseLocation = pathname.replace(/[^/]*$/, "");
const Router = protocol === "file:" ? HashRouter : BrowserRouter;

export default function Routes() {
	const [, setAvailableResources] = useState({});
	useEffect(() => {
		import("chartiq/plugins/activetrader/cryptoiq") // check if library plugin is available
			.then(() => {
				// load and update react component
				import("@chartiq/react-components/ActiveTrader/WorkstationExample").then((module) => {
					ActiveTrader = module.default;
					setAvailableResources({ activeTrader: true });
				});
			})
			.catch(() => {});

		// NOTE: Cross section is presently incompatible with library components version 9.1
		// import("chartiq/plugins/crosssection/core") // check if library plugin is available
		// 	.then(() => {
		// 		// load and update react component
		// 		import("@chartiq/react-components/CrossSection").then((module) => {
		// 			Crosssection = module.ChartExample;
		// 			setAvailableResources({ crosssection: true });
		// 		});
		// 	})
		// 	.catch(() => {});
	}, []);

	return (
		<Router basename={baseLocation}>
			<Route path='/' exact>
				<RouteList />
			</Route>
			<Route path='/index.html' component={RouteList}></Route>

			<Route path='/chart'>
				<Chart config={{
					plugins: { tfc: null, marketDepth: null },
					menuStudiesConfig: { excludedStudies: { DoM: true } }
				}} />
			</Route>

			{/* 
				NOTE: MultiChart is presently incompatible with library web components version 9.1
				<Route path='/multi-chart'>
					<MultiChartExample config={{
						plugins: { tfc: null, marketDepth: null, studyBrowser: null },
						menuStudiesConfig: { excludedStudies: { DoM: true } }
					}}
					/>
				</Route> 
			*/}

			<Route path='/active-trader' component={ActiveTrader}></Route>
			{/* 
				NOTE: TermStructure is presently incompatible with library web components version 9.1
				<Route path='/cross-section' component={Crosssection}></Route> 
			*/}

			<Route path='/custom-chart'>
				<CustomChart config={{
					plugins: { tfc: null, marketDepth: null, studyBrowser: null },
					menuStudiesConfig: { excludedStudies: { DoM: true } }
				}} />
			</Route>
			<Route path='/hello-world' component={HelloWorld}></Route>
		</Router>
	);
}

/**
 * Route index page
 *
 * @function RouteList
 */
function RouteList() {
	return (
		<main className='route-list'>
			<h2>ChartIQ React Application</h2>

			<p className='description'>
				The chartiq-react-app project is a toolkit of React components. The
				following components create complete charting applications: (Select the
				component names to see the applications.)
			</p>

			<ul className='top-level'>
				<li>
					<h3>
						<Link to='chart'>Chart</Link>
					</h3>
					<p>
						Chart component based on configuration. If using Technical Analysis
						package will render an advanced chart. <br></br>
					</p>
				</li>
				<li>
					<h3>
						{/* <Link to='multi-chart'> */}
							MultiChart
						{/* </Link> */}
					</h3>
					<p>
						NOTE: MultiChart is presently incompatible with library web components version 9.1
						<br/>
						To use this chart, you need to import legacy web components. See the <a href="https://documentation.chartiq.com/tutorial-Upgradelog_9.0.0-9.1.2.html" target="_blank">upgrade guide</a> for more information on working with legacy web components.
					</p>
					<p>Displays multiple charts with a shared header and footer.</p>
				</li>
				<li>
					<h3 title='Requires ActiveTrader and TFC plugins'>
						<Link to='active-trader'>ActiveTrader Workstation</Link>
					</h3>
					<p>
						Trade ready workstation built around the chart component enhanced
						with the following plug-ins:
					</p>
					<ul>
						<li>Trade From Chart</li>
						<li>Order Book</li>
						<li>Trade Book</li>
						<li>Market Depth Chart</li>
					</ul>
				</li>
				<li>
					<h3 title='Requires CrossSection plugin'>
						{/* <Link to='cross-section'> */}
							CrossSection (formerly TermStructure)
						{/* </Link> */}
					</h3>
					<p>
						NOTE: TermStructure is presently incompatible with library web components version 9.1
						<br/>
						To use this chart, you need to import legacy web components. See the <a href="https://documentation.chartiq.com/tutorial-Upgradelog_9.0.0-9.1.2.html" target="_blank">upgrade guide</a> for more information on working with legacy web components.
					</p>
					<p>
						Creates a term structure chart for working with non&ndash;time
						series data.
					</p>
				</li>
				<li>
					<h3>
						<Link to='custom-chart'>CustomChart</Link>
					</h3>
					<p>Integrates native React components with ChartIQ web components.</p>
				</li>
				<li>
					<h3>
						<Link to='hello-world'>HelloWorld</Link>
					</h3>
					<p>
						Creates a basic chart with no user interface as a starting point for
						using the ChartIQ API in React.
					</p>
				</li>
			</ul>
		</main>
	);
}
