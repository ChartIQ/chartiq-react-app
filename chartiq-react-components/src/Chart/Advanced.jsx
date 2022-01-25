// Import necessary ChartIQ library files
import { CIQ } from "chartiq/js/advanced";

import Chart from "./Chart"
import { getConfig, getCustomConfig } from "./resources"
// Base styles required by the library to render color correctly.
// If for some reason you are not including base-styles.css add these here.
import 'chartiq/css/normalize.css';
import 'chartiq/css/stx-chart.css'; // Chart API
import 'chartiq/css/chartiq.css'; // Chart UI

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 * @param {object} config Configuration used for the chart.
 * @param {object} resources Object of resources passed into configuration to be applied
 * @param {AdvancedChart~chartInitialized} chartInitialized Callback that fires when the chart is interactive
 */

export { Chart as default, CIQ, getConfig, getCustomConfig };

/**
 * @callback AdvancedChart~chartInitialized
 * @param {CIQ.ChartEngine} chartEngine
 * @param {CIQ.UI.Context} uiContext
 */