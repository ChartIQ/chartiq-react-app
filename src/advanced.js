import React from 'react';
import ReactDom from 'react-dom';

import './chartiq/style-imports';
import { AdvancedChart } from './chartiq';

import defaultConfig from './chartiq/_config';

const { chartConfig } = defaultConfig;

// chart configuration by extending and overriding default configuration
const config = {
	...defaultConfig,
	chartConfig: {
		...chartConfig,
		preferences: {
			...chartConfig.preferences,
			currentPriceLine: true
		}
	}
	// footer_range: true
};

ReactDom.render(
	<AdvancedChart config={config} />,
	document.querySelector('#app')
);
