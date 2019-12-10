import React from 'react';
import ReactDom from 'react-dom';

import './chartiq/style-imports';
// add style addtions and overrides here
import { AdvancedChart, getDefaultConfig } from './chartiq';

let config = getDefaultConfig();

// update chart configuration by modifying default configuration
config.chartConfig.preferences.currentPriceLine = true;
config.addOns.tooltip = null;

ReactDom.render(
	<AdvancedChart config={config} />,
	document.querySelector('#app')
);
