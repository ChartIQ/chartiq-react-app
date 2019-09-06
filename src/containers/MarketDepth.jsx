import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'components'
import 'plugins/cryptoiq/marketdepth'
import UIManager from '../components/Core/UIManager'
import 'feeds/L2_simulator'

/**
 * Stand alone MarketDepth chart component `<MarketDepth/>`.
 * 
 * Renders a market depth chart and provides default themes. 
 * @param quoteFeed object - A valid quoteFeed for fetching data
 * @param quoteFeedBehavior object - The behavior object to pass into your quoteFeed when it is attached
 * @param displayThemes boolean - Sets whether the default themes will be displayed or not
 * @export
 * @class WrappedChart
 * @extends {React.Component}
 */
export default class MarketDepth extends React.Component {
	constructor(props) {
		super(props);

		this.createEngine = container => {
			this.stx = new CIQ.ChartEngine({container: this.engineRef.current})
			// If in development allow access to globals for easy debugging
			if(process.env.NODE_ENV !== 'production') {
				if(!window.cq_debug) {
					window.cq_debug = {
						CIQ: CIQ,
						stx_md: this.stx
					}
				}
				else window.cq_debug.stx_md = this.stx
			}
			container.startChart(stxx, this.props.quoteFeed, this.props.quoteFeedBehavior, {})
			stxx.addEventListener("symbolImport", this.overrideChartLayout())
		}

		this.themesRef = React.createRef()
		this.engineRef = React.createRef()
		this.state = {}
	}

	componentDidMount() {
		if(localStorage.myChartLayout) delete localStorage.myChartLayout
		this.createEngine(this.engineRef.current);
		const props = this.props;
		let quoteFeed = props.quoteFeed;
		let stxx = this.stx;

		let UIStorage=new CIQ.NameValueStore();

		let themes = this.themesRef.current
		themes.initialize({
			builtInThemes: {"ciq-day":"Day","ciq-night":"Night"},
			defaultTheme: "ciq-night",
			nameValueStore: UIStorage
		});

		let defaultState = {
			engine: this.stx,
			theme: themes.currentTheme
		}

		this.setState((state) => Object.assign(state, defaultState))

		// Setup the L2 Simulator if using the quoteFeedSimulator
		if(CIQ.simulateL2) {
			CIQ.simulateL2({stx:stxx, onTrade:true});
		}

		// load a symbol so the OrderBook loads
		stxx.loadChart(props.symbol || "^BTCUSD")
	}

	componentDidUpdate() {
		let self=this;
		this.stx.loadChart(self.props.symbol, null, self.symbolChangeCallback)
	}

	overrideChartLayout() {
		let stx = this.stx
		stx.setChartType("marketdepth")
		Object.assign(stx.layout, {
			crosshair: true,
		})
		stx.changeOccurred("layout")
	}
	/**
	 * Overwrite me with any function to be called when the symbol changes
	 */
	symbolChangeCallback() {}

	/**
	 * Wrapper around CIQ.ChartEngine function of the same name.
	 * @see {@ link https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData}
	 * This function will immediately call draw for you so that you can immediately see results
	 */
	updateCurrentMarketData(data, chart, symbol, params) {
		this.stx.updateCurrentMarketData(data, chart, symbol, params);
		this.stx.draw();
	}

	render() {
		let displayThemes = this.props.displayThemes?"":"none"
		return(
			<div className="cq-chart-container">
			<UIManager />
			<cq-themes ref={this.themesRef} style={{display: displayThemes}}>
				<cq-themes-builtin>
					<template><cq-item></cq-item></template>
				</cq-themes-builtin>
			</cq-themes>
			<div className={"ciq-chart-area"} style={{height: '100%'}}>
				<div className={"ciq-chart"}>
					<chartiq-chart class="chartContainer" defer-start="true" animations="false" style={{height: "100%"}} ref={this.engineRef}>
					</chartiq-chart>
				</div>
			</div>
			</div>
		)
	}
}