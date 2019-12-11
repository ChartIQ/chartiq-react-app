import React from 'react';
import ReactDom from 'react-dom';

import './chartiq/style-imports';
// add style additions and overrides here
import { AdvancedChart, getDefaultConfig } from './chartiq';

let config = getDefaultConfig();

// update chart configuration by modifying default configuration
config.chartConfig.preferences.currentPriceLine = true;
config.addOns.tooltip = null;

// uncomment following to have minimal interace
// config.header = null
// config.footer = null;
// // turning off individual menus when header is set to true
// config.menu_periodicity = null;
// config.menu_views = null;
// config.menu_display = null;
// config.menu_events = null;


/**
 * Optional callback function to access chart engine and uiContext
 */
const chartInitialized = ({ chartEngine, uiContext }) => {
	// access to chart engine and uiContext
	// console.log(chartEngine, uiContext);
}

ReactDom.render(
	<AdvancedChart config={config} chartInitialized={chartInitialized} />,
	document.querySelector('#app')
);
