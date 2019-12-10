import React from 'react';
import ReactDom from 'react-dom';

import './chartiq/style-imports';
import { AdvancedChart, getDefaultConfig } from './chartiq';

let config = getDefaultConfig();

// chart configuration by updating default configuration
config.chartConfig.preferences.currentPriceLine = true;
config.addOns.tooltip = null;

ReactDom.render(
	<AdvancedChart config={config} />,
	document.querySelector('#app')
);
