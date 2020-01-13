import React from 'react'
import { CIQ } from 'chartiq/js/chartiq'
import 'chartiq/js/components'
import 'chartiq/plugins/cryptoiq/marketdepth'
import 'chartiq/examples/feeds/L2_simulator'
import UIManager from '../components/Core/UIManager'

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

		const { quoteFeed, quoteFeedBehavior } = this.props;

		this.themesRef = React.createRef();
		this.chartContainer = React.createRef();

		this.createEngine = container => {
			const stx = new CIQ.ChartEngine({ container });

			// If in development allow access to globals for easy debugging
			if(process.env.NODE_ENV !== 'production') {
				if(!window.cq_debug) {
					window.cq_debug = {
						CIQ: CIQ,
						stx_md: stx
					}
				}
			}
			container.startChart(stx, quoteFeed, quoteFeedBehavior, {});
			// stx.addEventListener("symbolImport", overrideChartLayout);
			overrideChartLayout();

			return stx;

			function overrideChartLayout() {
				stx.setChartType("marketdepth");
		
				// stx.layout.crosshair = true;
				stx.changeOccurred("layout");
			}
		}

	}

	componentDidMount() {
		if(localStorage.myChartLayout) delete localStorage.myChartLayout;

		const container = this.chartContainer.current;
		const stx = this.createEngine(container);
		this.stx = stx;
		const { quoteFeed, symbol } = this.props;

		const UIStorage=new CIQ.NameValueStore();

		const themes = this.themesRef.current
		themes.initialize({
			builtInThemes: {
				'ciq-day': 'Day',
				'ciq-night': 'Night'
			},
			defaultTheme: 'ciq-night',
			nameValueStore: UIStorage
		});

		// Setup the L2 Simulator if using the quoteFeedSimulator
		if(CIQ.simulateL2) {
			CIQ.simulateL2({stx, onTrade:true});
		}

		// load a symbol so the OrderBook loads
		stx.loadChart(symbol || "^BTCUSD")
	}

	componentDidUpdate() {
		this.stx.loadChart(this.props.symbol, null, this.symbolChangeCallback);
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
		const display  = this.props.displayThemes ? '' : 'none'
		const { symbol = "^BTCUSD" } = this.props
		return(
			<cq-context>
				<div className="cq-chart-container">
					<UIManager />
					<h2 style={{ color: '#888', marginLeft: 16 }}>Market Depth: {symbol}</h2>
					<cq-themes ref={this.themesRef} style={{display}}>
						<cq-themes-builtin>
							<template><cq-item></cq-item></template>
						</cq-themes-builtin>
					</cq-themes>
					<div className={"ciq-chart-area"}>
						<div className={"ciq-chart"}>
							<chartiq-chart class="chartContainer" defer-start="true" animations="false" style={{ height: '90%' }} ref={this.chartContainer}>
							</chartiq-chart>
						</div>
					</div>
				</div>
			</cq-context>
		)
	}
}