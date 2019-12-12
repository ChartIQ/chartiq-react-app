import React from 'react';
import ReactDom from 'react-dom';

import { AdvancedChart } from './chartiq';
// chart style sheets
import './chartiq/styles/base-imports';

// custom css styles following base style sheets
import './custom_chartiq_config/chart_styles.css';

// import custom configuration selector function
import { getConfiguration } from './custom_chartiq_config';

const config = getConfiguration();

/**
 * Optional callback function to access chart engine and uiContext
 */
const chartInitialized = ({ chartEngine, uiContext }) => {
	// access to chart engine and uiContext
	// console.log(chartEngine, uiContext);
};

ReactDom.render(
	<AdvancedChart config={config} chartInitialized={chartInitialized} />,
	document.querySelector('#app')
);
