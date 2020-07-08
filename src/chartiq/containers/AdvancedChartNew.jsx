import React from 'react';
import { CIQ as CIQUI } from 'chartiq/js/componentUI';

import {
	ChartNav,
	ChartArea,
	SidePanel,
	BottomPanel,
	ChartFooter
} from '../components/Layout';

//import { WrappedChart, Plugins } from '../components/Core';
import ColorPicker from '../components/Features/ColorPicker';
import ChartDialogs from '../components/Dialogs/ChartDialogs';
import ScriptIQ from '../components/Plugins/ScriptIQ/ScriptIQ';
import MarketDepthBookmark from '../components/Plugins/CryptoIQ/MarketDepthBookmark';

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
    //this.engineRef = React.createRef();
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
    
    //const stx = new CIQ.ChartEngine.create({ container, ...this.state.config });
    //let stxx = this.state.config.createChart();
    const chart = new CIQUI.UI.Chart();
    console.log("AdvancedChartNew -> createChartAndUI -> chart", chart)

    const config = getDefaultConfig();
    console.log("AdvancedChartNew -> createChartAndUI -> config", config)

    this.stx = (new CIQUI.UI.Chart()).createChartAndUI({ container, config });
    console.log("AdvancedChartNew -> createChartAndUI -> stx", this.stx)


    
    return;



	}





	render() {

    const breakpointSize = 'lg';
    const breakpointClass = `cq-chart-container break-${breakpointSize}`;

    var divStyle = {
      width: '500px',
      height: '500px'
    };

		return (
			<ChartContext.Provider value={this.state}>
        <cq-context ref={this.chartContextEl} className={breakpointClass}>
        <div className="ciq-chart-area">
          <div className="ciq-chart">
    

            <div className="chartContainer">


            </div>
          </div>
        </div>

				</cq-context>
			</ChartContext.Provider>
		);
	}
}
AdvancedChartNew.contextType = ChartContext;
