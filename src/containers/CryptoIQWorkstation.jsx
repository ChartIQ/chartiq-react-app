import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'addOns'
import 'markets/marketDefinitionsSample'
import 'markets/marketSymbologySample'
import UIManger from '../components/Core/UIManager'
import ChartArea from '../components/Layout/ChartArea'
import ColorPicker from '../components/Features/ColorPicker'
import ChartNav from '../components/Layout/ChartNav'
import SidePanel from '../components/Layout/SidePanel'
import TradeHistory from '../components/Plugins/CryptoIQ/TradeHistory'
import OrderBook from '../components/Plugins/CryptoIQ/OrderBook'
import WrappedChart from '../components/Core/WrappedChart'
import ChartDialogs from '../components/Dialogs/ChartDialogs'
import ChartFooter from '../components/Layout/ChartFooter'

import TradePanel from '../components/Plugins/TFC/TradePanel'

import { ChartContext } from '../react-chart-context'

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

		this.setContext = (update) => {
			this.setState((state) => {
				return Object.assign(this.context, update)
			}) 
			return update
		}

		let UIContext=new CIQ.UI.Context(null, document.querySelector("*[cq-context]"));
		let UILayout=new CIQ.UI.Layout(UIContext);
		let KeystrokeHub=new CIQ.UI.KeystrokeHub(document.querySelector("body"), UIContext, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});

		this.state = {
			stx: null,
			UIContext: UIContext,
			setContext: this.setContext,
			components: {AdvancedChart: this},
			registerComponent: (component) => { this.registerComponent(component) },
			resize: () => { this.resizeScreen() }
		}
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
		let self = this
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
		let context = Object.keys(this.context).length ? this.context : this.state
		if(!context || !context.chartArea || !context.UIContext) return
		let chartArea = context.chartArea
		let sidePanel
		if(context.UIContext.SidePanel)  sidePanel = context.UIContext.SidePanel
		let sidePanelWidth = sidePanel? sidePanel.nonAnimatedWidth() : 0
		chartArea.node.style.width = chartArea.width - sidePanelWidth +'px'
	}

	render() {
		let props = this.props
		let quoteFeed = props.quoteFeed
		let chartConstructor = props.chartConstructor
		let preferences = props.preferences
		let plugins = props.plugins || {}
		let cryptoiq = plugins.cryptoiq 

		return (
			<div className="cq-chart-container">
			<ChartContext.Provider value={this.state}>
				<UIManger />
				<ChartNav plugins={props.plugins} />
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
		)
	}
}
CryptoIQWorkstation.contextType = ChartContext

