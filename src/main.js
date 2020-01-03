import React from 'react';
import ReactDom from 'react-dom';

// import { CIQ } from 'chartiq/js/chartiq';
// CIQ.debug = true;

import { AdvancedChart } from './chartiq';
// chart style sheets
import './chartiq/styles/base-imports';

// custom css styles following base style sheets
import './custom_chartiq_config/chart_styles.css';

// import custom configuration selector function
import { getConfiguration, pluginsToLoadLazy } from './custom_chartiq_config';

const config = getConfiguration();

// config.quoteFeed.url = 'http://localhost:9876/datafeed';
config.refreshInterval = 0;

/**
 * Optional callback function to access chart engine and uiContext
 */
const chartInitialized = ({ chartEngine, uiContext }) => {
	// access to chart engine and uiContext
	// console.log(chartEngine, uiContext);
	// setTimeout(() => lazyLoadPlugins(pluginLoaded), 4000);
};

function renderApp() {
	// if hash is not #config show chart
	const showApp = location.hash !== '#config';
	ReactDom.render(
		showApp ? (
			<AdvancedChart
				config={config}
				chartInitialized={chartInitialized}
				pluginsToLoadLazy={pluginsToLoadLazy}
			/>
		) : (
			<div style={{ padding: '10px 30px', height: '100vh', overflow: 'auto' }}>
				<h3>Chart configuration</h3>
				<div style={{ whiteSpace: 'pre' }}>
					{JSON.stringify(config, null, 4)}
				</div>
			</div>
		),
		document.querySelector('#app')
	);
}

window.onhashchange = renderApp;
renderApp();
