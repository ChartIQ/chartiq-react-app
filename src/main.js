import React from 'react';
import ReactDom from 'react-dom';

// Base styles required for all charts
import './chartiq/styles/base-imports';

import { AdvancedChart, MultiChart, ActiveTraderWorkstation, CustomChart } from './chartiq';

// CIQ.debug = true; // Enables debugging

// Optional callback function to access chart engine and uiContext
const chartInitialized = ({ chartEngine, uiContext }) => {
	// chartEngine provides access to chart engine CIQ.ChartEngine
	// uiContext provides access to UI component interaction CIQ.UI.Context
};

// comment rendering to DOM if used only as export for example in CRA App.js
const el = document.querySelector('#app');
if (el) {
	ReactDom.render(<CustomChart
		chartInitialized={chartInitialized}
		/>,
		el
	);
}

export default (props) => (<CustomChart
	chartInitialized={chartInitialized}
	/>);