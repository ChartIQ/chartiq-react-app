import React from 'react';
import { CIQ } from 'chartiq/js/componentUI';

import html from "chartiq/plugins/tfc/tfcHtml";
import { ChartContext } from '../../context/ChartContext';
import { config } from './resources'; // ChartIQ library resources
const { channelWrite } = CIQ.UI.BaseComponent.prototype;

import './ActiveTraderWorkstation.css';

/**
 * This is a fully functional example showing how to load a chart with the Active Trader plugin and UI.
 *
 * @export
 * @class ActiveTraderWorkstation
 * @extends {React.Component}
 */
export default class ActiveTraderWorkstation extends React.Component {
	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.chartId = props.chartId || '_active-trader-chart';
		this.initialSymbol = '^USDAUD';

		this.state = {
			chart: new CIQ.UI.Chart(),
			stx: null,
			UIContext: null,
			chartInitializedCallback: props.chartInitialized
		};

	}

	componentDidMount() {

		const container  = this.container.current;
		const { chart, chartInitializedCallback } = this.state;

		// Update chart configuration by modifying default configuration
		config.chartId = this.chartId;
		config.initialSymbol = this.initialSymbol;
		// config.quoteFeeds[0].behavior.refreshInterval = 0;

		// Enable any extra addOns here before creating the chart
		// const { tooltip, continuousZoom, outliers } = config.addOns;
		// const activeAddOns = { continuousZoom, outliers, tooltip };
		// config.enabledAddOns = Object.assign(activeAddOns, config.enabledAddOns);
		
		config.plugins.marketDepth = {
			volume:true,
			mountain:true,
			step:true,
			record:true,
			height:"40%",
			precedingContainer:"#marketDepthBookmark"
		};

		config.menuChartPreferences = config.menuChartPreferences.filter(item => (
			item.label !== 'Market Depth' && item.label !== 'Extended Hours'
		));
		
		const uiContext = chart.createChartAndUI({ container, config });
		const chartEngine = uiContext.stx;
		this.startTFC({stx: chartEngine, account: CIQ.Account.Demo, context: uiContext});

		// Methods for capturing state changes in chart engine and UI
		
		// Channel subscribe
		// const { channels } = config;
		// const channelSubscribe = CIQ.UI.BaseComponent.prototype.channelSubscribe;
		// channelSubscribe(channels.breakpoint, (value) => {
		// 	console.log('channels.breakpoint',value);
		// }, stx);

		// Create layout listener, see parameters at https://documentation.chartiq.com/global.html#layoutEventListener
		// stx.addEventListener('layout', ({ layout }) => {
		// 	console.log('layout changed', layout);
		// });

		if (window['d3']) {
			this.cryptoSetup(uiContext.stx);
		} else {
			CIQ.loadScript('https://d3js.org/d3.v5.min.js', () => {
				this.cryptoSetup(uiContext.stx);
			})
		}

		// Request TFC channel open
		channelWrite(config.channels.tfc, true, uiContext.stx);		

		this.setState({stx: chartEngine, UIContext: uiContext});

		if(chartInitializedCallback){
			chartInitializedCallback({ chartEngine, uiContext });
		} 

	}

	componentWillUnmount(){
		// Destroy the ChartEngine instance when unloading the component. 
		// This will stop internal processes such as quotefeed polling.
		this.state.stx.destroy();
	}

	cryptoSetup(stx) {
		stx.setChartType("line");
		CIQ.extend(stx.layout,{
			crosshair:true,
			headsUp:"static",
			l2heatmap:true,
			rangeSlider:true,
			marketDepth:true,
			extended:false
		});
		stx.changeOccurred("layout");

		// Simulate L2 data using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
		CIQ.simulateL2({ stx, onInterval: 1000, onTrade: true });

		stx.moneyFlowChart=moneyFlowChart(stx);

		function moneyFlowChart(stx){
			const initialPieData = {
				Up: { index: 1 },
				Down: { index: 2 },
				Even: { index: 3 }
			};

			const pieChart=new CIQ.Visualization({
				container: "cq-tradehistory-table div[pie-chart] div",
				renderFunction: CIQ.SVGChart.renderPieChart,
				colorRange: ["#8cc176","#b82c0c","#7c7c7c"],
				className: "pie",
				valueFormatter: CIQ.condenseInt
			}).updateData(CIQ.clone(initialPieData));

			let last = null;
			stx.append("updateCurrentMarketData",function(data, chart, symbol, params){
				if(symbol) return;
				const items = document.querySelectorAll("cq-tradehistory-body cq-item");
				var d = {};
				for(var i = 0;i < items.length; i++){
					const item = items[i];
					if (item === last) break;
					var dir= item.getAttribute("dir");
					if(!dir) dir="even";
					dir = CIQ.capitalize(dir);
					if (!d[dir]) d[dir] = 0;
					d[dir] += parseFloat(item.querySelector("[col=amount]").getAttribute("rawval"));
				}
				if(i) pieChart.updateData(d, "add");
				last = items[0];
			});
			stx.addEventListener("symbolChange",function(obj){
				pieChart.updateData(CIQ.clone(initialPieData));
			});
			return pieChart;
		}
	}

	// Initialize the TFC plugin
	// This function serves the same purpose as the file 'plugins/tfc/tfc-loader.js`.
	// It is used to allow the plugin to work in the context of this gallery of examples
	// When using active-trader as a stand-alone component, you can leave this function
	// as it is, or remove it and uncomment the tfc-loader import in resources.js.
	startTFC(config) {
		var stx = config.stx;
		if (typeof config.account == "function")
			config.account = new config.account();

		var div = document.createElement("div");
		CIQ.innerHTML(div, html);
		for (var j = 0; j < div.children.length; j++) {
			var ch = div.children[j].cloneNode(true);
			config.context.topNode.appendChild(ch);
		}

		stx.tfc = new CIQ.TFC(config); // This is the *real* CIQ.TFC.
	
		stx.addEventListener("newChart", function () {
			stx.tfc.changeSymbol();
		});
	
		var topNode = config.context ? config.context.topNode : document;
	
		stx.tfc.selectSymbol = function (symbol) {
			if (config.context)
				config.context.changeSymbol(config.context, {
					symbol: symbol.toUpperCase()
				});
		};
	
		var sidePanel = topNode.querySelector("cq-side-panel"),
			tradePanel = topNode.querySelector(".stx-trade-panel");
		sidePanel.appendChild(tradePanel);
		if (sidePanel.getAttribute("cq-active") == "true") {
			sidePanel.open({ selector: ".stx-trade-panel", className: "active" });
			tradePanel.classList.remove("closed");
		}
	
		CIQ.safeClickTouch(
			topNode.querySelector(".stx-trade-nav .stx-trade-ticket-toggle"),
			function () {
				topNode.querySelector(".stx-trade-nav").classList.remove("active");
				topNode.querySelector(".stx-trade-info").classList.add("active");
				topNode.querySelector("cq-side-panel").resizeMyself();
			}
		);
		CIQ.safeClickTouch(
			topNode.querySelector(".stx-trade-info .stx-trade-ticket-toggle"),
			function () {
				topNode.querySelector(".stx-trade-info").classList.remove("active");
				topNode.querySelector(".stx-trade-nav").classList.add("active");
				topNode.querySelector("cq-side-panel").resizeMyself();
			}
		);
	
		if (config.account.Poller) config.account.Poller.startPolling(stx.tfc);
	
		var contextConfig = config.context.config;
		if (!contextConfig) return;
	
		CIQ.UI.BaseComponent.prototype.channelSubscribe(
			contextConfig.channels.tfc,
			handleActive,
			stx
		);
		function handleActive(isActive) {
			tradePanel.classList[isActive ? "remove" : "add"]("closed");
			tradePanel.classList[isActive ? "add" : "remove"]("active");
		}
	}

	render() {

		return (
			<ChartContext.Provider value={this.state}>
				<cq-context ref={this.container}>

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
							<cq-toggle class="tc-ui stx-tradingcentral"><span></span><cq-tooltip>Analyst Views</cq-tooltip></cq-toggle>
						</div>

					</div>
					</div>

					<cq-scriptiq class="scriptiq-ui"></cq-scriptiq>

					<cq-tradingcentral class="tc-ui" token="eZOrIVNU3KR1f0cf6PTUYg==" partner="1000" disabled></cq-tradingcentral>

					<div className="ciq-chart-area">
					<div chartarea="true">
						<div id="flexContainer">
							<div id="cryptoGroup1">
								<div id="tradeHistoryContainer">
									<cq-tradehistory cq-active>
										<cq-tradehistory-table>
											<cq-scroll cq-no-claim>
												<cq-tradehistory-body maxrows="500"></cq-tradehistory-body>
											</cq-scroll>
											<div pie-chart="true">
												<span>Money Flow</span>
												<div></div>
											</div>
										</cq-tradehistory-table>
										<template>
											<cq-item>
												<div col="time">Time</div>
												<div col="qty">Qty</div>
												<div col="price">Price</div>
												<div col="amount">Amount</div>
											</cq-item>
										</template>
									</cq-tradehistory>
								</div>
							</div>
							<div id="cryptoGroup2">
								<div id="marketDepthBookmark"></div>
								<div id="orderBookContainer">
									<cq-orderbook cq-active>
										<cq-orderbook-table reverse>
											<cq-scroll cq-no-claim>
												<cq-orderbook-bids></cq-orderbook-bids>
											</cq-scroll>
										</cq-orderbook-table>
										<cq-orderbook-table>
											<cq-scroll cq-no-claim>
												<cq-orderbook-asks></cq-orderbook-asks>
											</cq-scroll>
										</cq-orderbook-table>
										<template>
											<cq-item cq-size-shading>
												<div col="price">Price</div>
												<div col="size">Size</div>
												<div col="amount">Amount</div>
											</cq-item>
										</template>
									</cq-orderbook>
								</div>
							</div>
						
							<div id="mainChartGroup" packager-append-child="div.ciq-chart-area div.ciq-chart">
								<div className="ciq-chart">

									<cq-palette-dock>
										<div className="palette-dock-container">
											<cq-drawing-palette class="palette-drawing grid palette-hide" docked="true" orientation="vertical" min-height="300" cq-drawing-edit="none"></cq-drawing-palette>
											<cq-drawing-settings class="palette-settings" docked="true" hide="true" orientation="horizontal" min-height="40" cq-drawing-edit="none"></cq-drawing-settings>
										</div>
									</cq-palette-dock>
						
									<div className="chartContainer">
						
										<cq-chart-title cq-marker cq-browser-tab></cq-chart-title>
						
										<cq-comparison-lookup></cq-comparison-lookup>
										<cq-chart-legend></cq-chart-legend>
						
									</div>
								</div>
							</div>

						</div>
					</div>

					</div>

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
ActiveTraderWorkstation.contextType = ChartContext;
