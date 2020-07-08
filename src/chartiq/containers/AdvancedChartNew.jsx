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

    this.stx = chart.createChartAndUI({container: container, config: this.state.config});
    console.log("AdvancedChartNew -> createChartAndUI -> stx", this.stx)


    
    return;

	}





	render() {

    const breakpointSize = 'lg';
    const breakpointClass = `cq-chart-container break-${breakpointSize}`;

		return (
			<ChartContext.Provider value={this.state}>
        <cq-context ref={this.chartContextEl} className={breakpointClass}>
        <div className="ciq-nav full-screen-hide">
          <div className="ciq-menu-section">
            <div className="ciq-dropdowns">
            <cq-menu class="ciq-menu ciq-preferences collapse">
					<span></span>
					<cq-menu-dropdown>
						<cq-menu-dropdown-section class="chart-preferences">
							<cq-heading>Chart Preferences</cq-heading>
							<cq-menu-container cq-name="menuChartPreferences"></cq-menu-container>
							<cq-separator></cq-separator>
						</cq-menu-dropdown-section>
						<cq-menu-dropdown-section class="y-axis-preferences">
							<cq-heading>Y-Axis Preferences</cq-heading>
							<cq-menu-container cq-name="menuYAxisPreferences"></cq-menu-container>
							<cq-separator></cq-separator>
						</cq-menu-dropdown-section>
						<cq-menu-dropdown-section class="chart-theme">
							<cq-heading>Themes</cq-heading>
							<cq-themes></cq-themes>
							<cq-separator></cq-separator>
						</cq-menu-dropdown-section>
						<cq-menu-dropdown-section class="chart-locale">
							<cq-heading>Locale</cq-heading>
							<cq-item><cq-clickable cq-selector="cq-timezone-dialog" cq-method="open">Change Timezone</cq-clickable></cq-item>
							<cq-item stxsetget="Layout.Language()"><cq-flag></cq-flag><cq-language-name>Change Language</cq-language-name></cq-item>
						</cq-menu-dropdown-section>
					</cq-menu-dropdown>
				</cq-menu>
            </div>
          </div>
        </div>
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
