import React from 'react'
import { CIQ } from 'chartiq/js/chartiq'
import 'chartiq/js/addOns'
import 'chartiq/examples/markets/marketDefinitionsSample'
import 'chartiq/examples/markets/marketSymbologySample'
import UIManager from '../components/Core/UIManager'
import WrappedChart from '../components/Core/WrappedChart'

import { ChartNav, ChartArea, ChartFooter, SidePanel } from '../components/Layout'
import ColorPicker from '../components/Features/ColorPicker'
import TradeHistory from '../components/Plugins/CryptoIQ/TradeHistory'
import OrderBook from '../components/Plugins/CryptoIQ/OrderBook'
import TradePanel from '../components/Plugins/TFC/TradePanel'
import ChartDialogs from '../components/Dialogs/ChartDialogs'

import { ChartContext } from '../context/ChartContext'

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 * 
 * Customize this sample template as needed to meet your use case and fit the screen size of your supported devices.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 */
export default class CryptoIQWorkstation extends React.Component {
	constructor(props) {
		super(props)

		this.contextContainer = React.createRef();

		this.setContext = (update) => {
			this.setState((state) => {
				return Object.assign(this.context, update)
			}) 
			return update;
		}

		this.state = {
			stx: null,
			UIContext: null,
			setContext: this.setContext,
			components: {AdvancedChart: this},
			registerComponent: (component) => { this.registerComponent(component) },
			resize: () => { this.resizeScreen() }
		}
	}

	componentDidMount() {
		const UIContext = new CIQ.UI.Context(null, this.contextContainer.current);
		new CIQ.UI.Layout(UIContext);
		new CIQ.UI.KeystrokeHub(document.body, UIContext, { cb:CIQ.UI.KeystrokeHub.defaultHotKeys });

		this.state({ UIContext });
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if(prevState.stx===null && this.state.stx!=null) {
			this.state.stx.addEventListener("symbolImport", this.overrideChartLayout())
		}
		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
	}

	overrideChartLayout() {
		let self = this;
		return function () {
			this.setChartType('line');
			this.slider.slider.setChartType('line')
			Object.assign(this.layout,{
				crosshair:true,
				headsUp:"static",
				l2heatmap:true,
				rangeSlider:true,
				marketDepth:true,
				extended:false
			});
			self.context.UIContext.ToggleTradePanel.set(true)
			this.changeOccurred('layout');
		}
	}

	registerComponent(component) {
		this.setState((state) => {
			return Object.assign(this.state.components, component)
		})
		return component
	}

	resizeScreen() {
		const { chartArea, UIContext, SidePanel: sidePanel } = this.state;
		if(!chartArea || !UIContext) return

		let sidePanelWidth = sidePanel? sidePanel.nonAnimatedWidth() : 0;
		chartArea.node.style.width = chartArea.width - sidePanelWidth +'px';
	}

	render() {
		const { stx } = this.state;
		const { quoteFeed, chartConstructor, preferences, plugins = {}, cryptoiq } = this.plugins;

		return (
			<cq-context ref={this.contextContainer}>
				<div className="cq-chart-container">
					<ChartContext.Provider value={this.state}>
						<UIManager />
						<ChartNav plugins={plugins} />
						<ColorPicker />
						<ChartArea>
							<div id="flexContainer">
								<TradeHistory />
								<div id="cryptoGroup2">
									<div id="marketDepthBookmark" /> 
									{cryptoiq.OrderBook && this.context.stx && <OrderBook 
										amount={cryptoiq.OrderBook.amount}
										size={cryptoiq.OrderBook.size}
										price={cryptoiq.OrderBook.price}
									/>}
								</div>
								<div id="mainChartGroup">
									<WrappedChart
										quoteFeed={quoteFeed}
										chartConstructor={chartConstructor}
										preferences={preferences}
										staticHeadsUp={true}
										dynamicHeadsUp={true}
										addOns={props.addOns}
										plugins={props.plugins}
									/>
								</div>
							</div>
						</ChartArea>
						<SidePanel>
							{props.plugins && props.plugins.TFC && 
								<TradePanel />
							}
						</SidePanel>
						<ChartFooter />
						<ChartDialogs />
					</ChartContext.Provider>
				</div>
			</cq-context>

		)
	}
}
CryptoIQWorkstation.contextType = ChartContext

