import React from 'react';
import { CIQ } from 'chartiq/js/componentUI';

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
    const chart = new CIQ.UI.Chart();
    console.log("AdvancedChartNew -> createChartAndUI -> chart", chart)

    const config = getDefaultConfig();
    console.log("AdvancedChartNew -> createChartAndUI -> config", config)

    this.stx = (new CIQ.UI.Chart()).createChartAndUI({ container, config });
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
        <div className="ciq-nav full-screen-hide">


<div className="sidenav-toggle ciq-toggles">
  <cq-toggle 
    class="ciq-sidenav" 
    cq-member="sidenav" 
    cq-toggles="sidenavOn,sidenavOff"
    cq-toggle-classes="active,"><span></span>
    <cq-tooltip>More</cq-tooltip>
  </cq-toggle>
</div>

<cq-menu class="ciq-search">
  <cq-lookup cq-keystroke-claim cq-keystroke-default cq-uppercase></cq-lookup>
</cq-menu>

<cq-side-nav cq-on="sidenavOn">
  <div className="icon-toggles ciq-toggles">
    <cq-toggle class="ciq-draw" cq-member="drawing"><span></span><cq-tooltip>Draw</cq-tooltip></cq-toggle>
    <cq-toggle class="ciq-CH" cq-member="crosshair"><span></span><cq-tooltip>Crosshair</cq-tooltip></cq-toggle>
    <cq-info-toggle></cq-info-toggle>
  </div>
</cq-side-nav>

<div className="ciq-menu-section">

  <div className="ciq-dropdowns">
    <cq-menu class="ciq-menu ciq-period">
      <span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
      <cq-menu-dropdown>
        <cq-menu-container cq-name="menuPeriodicity"></cq-menu-container>
      </cq-menu-dropdown>
    </cq-menu>

    <cq-menu class="ciq-menu ciq-views collapse">
      <span>Views</span>
      <cq-menu-dropdown>
        <cq-views></cq-views>
      </cq-menu-dropdown>
    </cq-menu>

    <cq-menu class="ciq-menu ciq-display collapse">
      <span>Display</span>
    <cq-menu-dropdown>
      <cq-menu-dropdown-section class="chart-types">
        <cq-heading>Chart Style</cq-heading>
        <cq-menu-container cq-name="menuChartStyle"></cq-menu-container>
      </cq-menu-dropdown-section>
      <cq-menu-dropdown-section class="chart-aggregations">
        <cq-menu-container cq-name="menuChartAggregates"></cq-menu-container>
      </cq-menu-dropdown-section>
    </cq-menu-dropdown>
  </cq-menu>

    <cq-menu class="ciq-menu ciq-studies collapse">
      <span>Studies</span>
      <cq-menu-dropdown cq-no-scroll>
        <cq-study-legend cq-no-close>
          <cq-section-dynamic>
            <cq-heading>Current Studies</cq-heading>
            <cq-study-legend-content>
              <template cq-study-legend="true">
                <cq-item>
                  <cq-label class="click-to-edit"></cq-label>
                  <div className="ciq-icon ciq-close"></div>
                </cq-item>
              </template>
            </cq-study-legend-content>
            <cq-placeholder>
              <div stxtap="Layout.clearStudies()" className="ciq-btn sm">Clear All</div>
            </cq-placeholder>
          </cq-section-dynamic>
        </cq-study-legend>
        <div className="scriptiq-ui">
          <cq-heading>ScriptIQ</cq-heading>
            <cq-item><cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">New Script</cq-clickable></cq-item>
            <cq-scriptiq-menu></cq-scriptiq-menu>
          <cq-separator></cq-separator>
        </div>
        <cq-heading cq-filter cq-filter-min="-1">Studies</cq-heading>
        <cq-scroll cq-no-maximize>
          <cq-studies></cq-studies>
        </cq-scroll>
      </cq-menu-dropdown>
    </cq-menu>

    <cq-menu class="ciq-menu stx-markers collapse">
      <span>Events</span>
      <cq-menu-dropdown>
        <cq-heading>Chart Events</cq-heading>
        <cq-item stxtap="Markers.showMarkers('square')">Simple Square<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-item stxtap="Markers.showMarkers('circle')">Simple Circle<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-item stxtap="Markers.showMarkers('callout')">Callouts<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-item class="ta_markers-ui" stxtap="Markers.showMarkers('trade')">Trade<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-item class="video_markers-ui" stxtap="Markers.showMarkers('video')">Video<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-item stxtap="Markers.showMarkers('abstract')">Abstract<span className="ciq-radio"><span></span></span>
        </cq-item>
        <cq-separator></cq-separator>
        <cq-item stxtap="Markers.showMarkers()" class="ciq-active">None<span className="ciq-radio"><span></span></span>
        </cq-item>
        <div className="timespanevent-ui">
          <cq-separator></cq-separator>
          <cq-heading>Panel Events</cq-heading>
          <cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('Order')" cq-no-close>Order<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
          <cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('CEO')" cq-no-close>CEO<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
          <cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('News')" cq-no-close>News<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
        </div>
      </cq-menu-dropdown>
    </cq-menu>

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

  <div className="trade-toggles ciq-toggles">
    <cq-toggle class="tfc-ui sidebar stx-trade" cq-member="tfc"><span></span><cq-tooltip>Trade</cq-tooltip></cq-toggle>
    <cq-toggle class="tc-ui stx-tradingcentral" cq-member="tc"><span></span><cq-tooltip>Analysis</cq-tooltip></cq-toggle>
    <cq-toggle class="recognia-ui stx-recognia" cq-member="recognia"><span></span><cq-tooltip>Analysis</cq-tooltip></cq-toggle>
  </div>

</div>
</div>

<cq-scriptiq class="scriptiq-ui"></cq-scriptiq>

<cq-tradingcentral class="tc-ui" token="eZOrIVNU3KR1f0cf6PTUYg==" partner="1000" disabled></cq-tradingcentral>

<cq-recognia uid="" lang="en" disabled></cq-recognia> 

<cq-recent-symbols>
<div className="ciq-chart-area">
  <div className="ciq-chart">

    <cq-palette-dock>
      <div className="palette-dock-container">
        <cq-drawing-palette class="palette-drawing grid palette-hide" docked="true" orientation="vertical" min-height="300" cq-drawing-edit="none"></cq-drawing-palette>
        <cq-drawing-settings class="palette-settings" docked="true" hide="true" orientation="horizontal" min-height="40" cq-drawing-edit="none"></cq-drawing-settings>
      </div>
    </cq-palette-dock>

    <div className="chartContainer">

      <cq-chart-title cq-marker cq-browser-tab></cq-chart-title>

      <cq-chartcontrol-group class="full-screen-show" cq-marker></cq-chartcontrol-group>

      <cq-comparison-lookup-fix></cq-comparison-lookup-fix>

      <cq-chart-legend></cq-chart-legend>

      <cq-loader></cq-loader>
    </div>
  </div>
</div>
</cq-recent-symbols>

<cq-abstract-marker cq-type="helicopter"></cq-abstract-marker>

<cq-attribution></cq-attribution>

<div className="ciq-footer full-screen-hide">
<cq-share-button></cq-share-button>
<cq-show-range></cq-show-range>
</div>

<div className="cq-context-dialog">
<cq-dialog>
  <cq-drawing-context></cq-drawing-context>
</cq-dialog>

<cq-dialog>
  <cq-study-context></cq-study-context>
</cq-dialog>
</div>

<cq-side-panel></cq-side-panel>

				</cq-context>
			</ChartContext.Provider>
		);
	}
}
AdvancedChartNew.contextType = ChartContext;
