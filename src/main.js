import React from 'react';
import ReactDom from 'react-dom';

import
// { CIQ } from  // Enable to access CIQ namespace
'./chartiq_config/presets/base';
import './chartiq_config/presets/examples';

// Include plugins
// import timespanevent from './chartiq_config/presets/timespanevents';
// import crypto from './chartiq_config/presets/cryptoiq';
// import scriptiq from './chartiq_config/presets/scriptiq';
// import tfc from './chartiq_config/presets/tfc';

import { AdvancedChart, getDefaultConfig } from './chartiq';

// CIQ.debug = true; // Enables debugging

const pluginsToLoadLazy = {
	// timespanevent,
	// crypto,
	// scriptiq,
	// tfc
}

const config = getDefaultConfig();

// Update chart configuration by modifying default configuration
config.chartConfig.preferences.currentPriceLine = true;
config.addOns.tooltip = null;

// Optional callback function to access chart engine and uiContext
const chartInitialized = ({ chartEngine, uiContext }) => {
	// chartEngine provides access to chart engine CIQ.ChartEngine
	// uiContext provides access to UI component interaction CIQ.UI.Context
};

// comment rendering to DOM if used only as export for example in CRA App.js
const el = document.querySelector('#app');
if (el) {
	ReactDom.render(<AdvancedChart
		config={config}
		chartInitialized={chartInitialized}
		pluginsToLoadLazy={pluginsToLoadLazy}
		/>,
		el
	);
}

export default (props) => (<AdvancedChart
	config={config}
	chartInitialized={chartInitialized}
	pluginsToLoadLazy={pluginsToLoadLazy}
	/>);