import React from 'react';
import ReactDom from 'react-dom';

import './chartiq/style-imports';
// add style additions and overrides here
import { AdvancedChart, getDefaultConfig } from './chartiq';

let config = getDefaultConfig();

// update chart configuration by modifying default configuration
config.chartConfig.preferences.currentPriceLine = true;
config.addOns.tooltip = null;

// select and order symbol market tabs
config.symbolLookupTabs = ['ALL', 'FX', 'STOCKS'];

// uncomment following to have minimal interace
// config.header = null
// config.footer = null;

// turning off individual menus or re-ordering
// config.menus = ['menu_display', 'menu_periodicity', 'menu_views', 'menu_studies', 'menu_events'];

// show only few studies
// config.menu_studies.include_only = ['ATR Bands', 'MACD', 'Moving Average'];

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
