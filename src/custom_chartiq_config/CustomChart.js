import React from 'react';

import { 
  AdvancedChart,
  getConfiguration, 
  pluginsToLoadLazy 
} from './';

const config = getConfiguration();

/**
 * Optional callback function to access chart engine and uiContext
 */
const chartInitialized = ({ chartEngine, uiContext }) => {
	// access to chart engine and uiContext
	// console.log(chartEngine, uiContext);
};

export default function () {
  return <AdvancedChart
			config={config}
			chartInitialized={chartInitialized}
			pluginsToLoadLazy={pluginsToLoadLazy}
		/>;
}