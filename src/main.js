import React from 'react';
import ReactDom from 'react-dom';

import { CIQ } from 'chartiq/js/chartiq';

CIQ.debug = true;

import { AdvancedChart } from './chartiq';
// chart style sheets
import './chartiq/styles/base-imports';

// custom css styles following base style sheets
import './custom_chartiq_config/chart_styles.css';

// import custom configuration selector function
import { getConfiguration, pluginsToLoadLazy } from './custom_chartiq_config';

const config = getConfiguration();

/**
 * Optional callback function to access chart engine and uiContext
 */
const chartInitialized = ({ chartEngine, uiContext }) => {
	// access to chart engine and uiContext
	// console.log(chartEngine, uiContext);
	// setTimeout(() => lazyLoadPlugins(pluginLoaded), 4000);
};

ReactDom.render(
	<AdvancedChart config={config} chartInitialized={chartInitialized} pluginsToLoadLazy={pluginsToLoadLazy} />,
	document.querySelector('#app')
);
