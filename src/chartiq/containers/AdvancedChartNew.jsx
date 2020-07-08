import React from 'react';
import { CIQ } from 'chartiq/js/componentUI';

import { ChartContext } from '../context/ChartContext';
import { getDefaultConfig } from '../_config';

// shortcut to chartiq provided property observer
//const { observeProperty } = CIQ.UI;

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 */
export default class AdvancedChartNew extends React.Component {
	constructor(props) {
		super(props);
    this.engineRef = React.createRef();
    this.chartContextEl = React.createRef();

    this.state = {
			stx: null,
			UIContext: null,
			config: getDefaultConfig()
		};
	}



	componentDidMount() {
		this.createChartAndUI(this.chartContextEl.current);
	}

	createChartAndUI(container) {
  console.log("AdvancedChartNew -> createChartAndUI -> container", container)
    
    const chart = new CIQ.UI.Chart();

    window.chart = chart;

    //this.stx = chart.createChartAndUI({container: container, config: this.state.config});
    //console.log("AdvancedChartNew -> createChartAndUI -> stx", this.stx)
    //CIQ.ChartEngine.create({ container: container, config: this.state.config });

    const stx = CIQ.ChartEngine.create({
			container: this.engineRef,
			config,
			deferLoad: true
		});
    return;

	}





	render() {

    const breakpointSize = 'lg';
    const breakpointClass = `cq-chart-container break-${breakpointSize}`;

		return (
			<ChartContext.Provider value={this.state}>
        <cq-context ref={this.chartContextEl} class={breakpointClass}>
        <div className="ciq-chart-area">
            <div className="ciq-chart">
        

              <div className="chartContainer" ref={this.engineRef}>


              </div>
            </div>
          </div>
				</cq-context>
			</ChartContext.Provider>
		);
	}
}
AdvancedChartNew.contextType = ChartContext;
