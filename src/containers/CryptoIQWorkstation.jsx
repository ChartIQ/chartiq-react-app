import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'addOns'
import 'markets/marketDefinitionsSample'
import 'markets/marketSymbologySample'
import UIManger from '../components/Core/UIManager'
import ColorPicker from '../components/Features/ColorPicker'
import ChartNav from '../components/Layout/ChartNav'
import TradeHistory from '../components/Plugins/CryptoIQ/TradeHistory'
import OrderBook from '../components/Plugins/CryptoIQ/OrderBook'
import WrappedChart from '../components/Core/WrappedChart'
import ChartDialogs from '../components/Dialogs/ChartDialogs'
import ChartFooter from '../components/Layout/ChartFooter'
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
			height: null,
			setContext: this.setContext,
			getHeight: this.getHeight
		}
	}
	componentDidMount() {
		console.log('workstation mounted')
		console.log('state.stx: ',this.state.stx)
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('workstation snapshot before update ', prevState)
		if(prevState.stx===null && this.state.stx!=null) {
			this.state.stx.addEventListener("symbolImport", this.overrideChartLayout())
		}
		return null
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('workstation updated')
		// stx.addEventListener("symbolImport",overrideLayoutSettings);
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
	}

	overrideChartLayout() {
		let stx = this.state.stx
		return function () {
			stx.setChartType('line');
			stx.slider.slider.setChartType('line')
			Object.assign(stx.layout,{
				crosshair:true,
				headsUp:"static",
				l2heatmap:true,
				rangeSlider:true,
				marketDepth:true,
				extended:false
			});
			stx.changeOccurred('layout');
		}
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
				<div className="ciq-chart-area">
					<div id="flexContainer">
						<TradeHistory />
						<WrappedChart id="mainChartGroup" classes="foo"
							quoteFeed={quoteFeed}
							chartConstructor={chartConstructor}
							preferences={preferences}
							staticHeadsUp={true}
							dynamicHeadsUp={true}
							addOns={props.addOns}
							plugins={props.plugins}
						/>
						<div id="cryptoGroup2">
							<div id="marketDepthBookmark" /> 
							{cryptoiq.OrderBook && this.context.stx && <OrderBook 
								amount={cryptoiq.OrderBook.amount}
								size={cryptoiq.OrderBook.size}
								price={cryptoiq.OrderBook.price}
							/>}
						</div>
					</div>
				</div>
				<ChartFooter />
				<ChartDialogs />
			</ChartContext.Provider>
			</div>
		)
	}
}
CryptoIQWorkstation.contextType = ChartContext

