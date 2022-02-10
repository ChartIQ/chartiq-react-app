import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Link, Route } from "react-router-dom";

import "chartiq/css/page-defaults.css";

import HelloWorld from "../HelloWorld/HelloWorld";
import { MultiChartPage } from "../MultiChart";
import CustomChart from "../CustomChart/CustomChart";

import { ChartExample as Chart } from "@chartiq/react-components/Chart";
import MissingFeature from "../MissingFeature";

import "./Router.css";

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
	const [availableResources, setAvailableResources] = useState({});
	useEffect(() => {
		import("chartiq/js/advanced.js")
			.then(() => {
				// check if library advanced features are available
				setAvailableResources({ ...availableResources, advancedChart: true });

				import("chartiq/plugins/activetrader/cryptoiq") // check if library plugin is available
					.then(() => {
						// load and update react component
						import("@chartiq/react-components/ActiveTrader").then((module) => {
							ActiveTrader = module.WorkstationExample;
							setAvailableResources({ ...availableResources, activeTrader: true });
						});
					})
					.catch(() => {});
			})
			.catch(() => {});


		import("chartiq/plugins/crosssection/core") // check if library plugin is available
			.then(() => {
				// load and update react component
				import("@chartiq/react-components/CrossSection").then((module) => {
					Crosssection = module.ChartExample;
					setAvailableResources({ ...availableResources, crosssection: true });
				});
			})
			.catch(() => {});
	}, []);

	return (
		<Router basename={baseLocation}>
			<Route path='/' exact>
				<RouteList availableResources={availableResources} />
			</Route>
			<Route path='/index.html' component={RouteList}></Route>

			<Route path='/technical-analysis' component={Chart}></Route>
			<Route path='/multi-chart' component={MultiChartPage}></Route>

			<Route path='/active-trader' component={ActiveTrader}></Route>
			<Route path='/cross-section' component={Crosssection}></Route>

			<Route path='/custom-chart' component={CustomChart}></Route>
			<Route path='/hello-world' component={HelloWorld}></Route>
		</Router>
	);
}

/**
 * Route index page
 *
 * @function RouteList
 */
function RouteList({ availableResources }) {
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
					<h3 title='Requires Technical Analsysis Package'>
						<Link to='technical-analysis'>AdvancedChart</Link>
					</h3>
					<p>
						Creates a chart with a full-featured user interface.
						AdvancedChartComponent is the equivalent of ChartIQ's{" "}
						<i>technical-analysis-chart.html</i> advanced template.
					</p>
				</li>
				<li>
					<h3>
						<Link to='multi-chart'>MultiChart</Link>
					</h3>
					<p>
						Displays two advanced chart components side by side in the same
						document.
					</p>
				</li>
				<li>
					<h3 title='Requires ActiveTrader and TFC plugins'>
						<Link to='active-trader'>ActiveTrader Workstation</Link>
					</h3>
					<p>
						Features the advanced chart component enhanced with the following
						plug-ins:
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
