import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Link, Routes, Route } from "react-router";

import "chartiq/css/page-defaults.css";

import HelloWorld from "../HelloWorld/HelloWorld.jsx";
import MultiChartExample from "../../components/MultiChart/index.js";
import CustomChart from "../CustomChart/CustomChart.jsx";
import { ChartExample } from "../../components/Chart/index.js";
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

export default function MainRoutes() {
	const [, setAvailableResources] = useState({});
	useEffect(() => {
		import("chartiq/plugins/activetrader/cryptoiq") // check if library plugin is available
			.then(() => {
				// load and update react component
				import("../../components/ActiveTrader/WorkstationExample.jsx").then((module) => {
				ActiveTrader = module.default;
					setAvailableResources({ activeTrader: true });
				});
			})
			.catch(() => { });
		import("chartiq/plugins/crosssection/core")
			.then(() => {
				// load and update react component
				import("../../components/CrossSection/index.js").then((module) => {
					Crosssection = module.ChartExample;
					setAvailableResources({ crosssection: true });
				});
			})
			.catch(() => {});
		
		// Reload page on browser back/forward React Router would change the route BUT keep the same React component instances in memory
		// ChartIQ state (chart data, drawings, settings) was preserved in the component and in localStorage/DOM
		const handlePopState = () => {
			window.location.reload();
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	return (
		<Router basename={baseLocation}>
			<Routes>
				<Route index path='/' element={<RouteList />} />
				<Route path='/index.html' element={<RouteList />} />
				<Route path='/chart' element={<Chart config={{
					plugins: { tfc: null, marketDepth: null },
					menuStudiesConfig: { excludedStudies: { DoM: true } }
				}} />} />

				<Route path='/multi-chart' element={<MultiChartExample config={{
					plugins: { tfc: null, marketDepth: null, studyBrowser: null },
					menuStudiesConfig: { excludedStudies: { DoM: true } }
				}}
				/>} />
				<Route path='/active-trader' element={<ActiveTrader />} />
				
				<Route path='/cross-section' element={<Crosssection />} />				
			

				<Route path='/custom-chart' element={<CustomChart config={{
					plugins: { tfc: null, marketDepth: null, studyBrowser: null },
					menuStudiesConfig: { excludedStudies: { DoM: true } }
				}} />} />
				<Route path='/hello-world' element={<HelloWorld />} />
			</Routes>
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
						<Link to='multi-chart'>
							MultiChart
						</Link>
					</h3>
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
						<Link to='cross-section'>
						CrossSection (formerly TermStructure)
						</Link>
					</h3>
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
