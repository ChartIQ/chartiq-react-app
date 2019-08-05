import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'addOns'
import 'markets/marketDefinitionsSample'
import 'markets/marketSymbologySample'
import UIManger from '../components/Core/UIManager'
import ColorPicker from '../components/Features/ColorPicker'
import ChartNav from '../components/Layout/ChartNav'
import TradingCentralComponents from '../components/Plugins/TradingCentral/TradingCentralComponents'
import ChartArea from '../components/Layout/ChartArea'
import WrappedChart from '../components/Core/WrappedChart'
import SidePanel from '../components/Layout/SidePanel'
import ScriptIQ from '../components/Plugins/ScriptIQ/ScriptIQ'
import TradePanel from '../components/Plugins/TFC/TradePanel'
import ChartDialogs from '../components/Dialogs/ChartDialogs'
import ChartFooter from '../components/Layout/ChartFooter'
import { ChartContext } from '../react-chart-context'
import BottomPanel from '../components/Layout/BottomPanel';

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 * 
 * Customize this sample template as needed to meet your use case and fit the screen size of your supported devices.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 */
export default class AdvancedChart extends React.Component {
	constructor(props) {
		super(props)

		this.setContext = (update) => {
			this.setState((state) => {
				return Object.assign(this.state, update)
			}) 
			return update
		}

		let UIContext=new CIQ.UI.Context(null, document.querySelector("*[cq-context]"));
		let UILayout=new CIQ.UI.Layout(UIContext);
		let KeystrokeHub=new CIQ.UI.KeystrokeHub(document.querySelector("body"), UIContext, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});
		// var UIStudyEdit=new CIQ.UI.StudyEdit(null, UIContext);
		// var UIDrawingEdit = new CIQ.UI.DrawingEdit(null, UIContext);

		this.state = {
			stx: null,
			UIContext: UIContext,
			components: {AdvancedChart: this},
			setContext: this.setContext,
			resize: () => { this.resizeScreen() }
		}
	}

	componentDidUpdate() {
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
	}

	resizeScreen() {
		let context = Object.keys(this.context).length ? this.context : this.state
		if(!context || !context.chartArea || !context.UIContext) return
		let chartArea = context.chartArea
		let sidePanel, bottomPanel, scriptiq
		if(context.UIContext.SidePanel)  sidePanel = context.UIContext.SidePanel
		if(context.components.BottomPanel) bottomPanel = context.components.BottomPanel
		let sidePanelWidth = sidePanel? sidePanel.nonAnimatedWidth() : 0
		let bottomPanelHeight = bottomPanel? bottomPanel.node.clientHeight : 0
		// bottomPanel.resize()
		// if(context.UIContext.ScriptIQ) scriptiq = context.UIContext.ScriptIQ
		// let editorHeight = scriptiq? scriptiq.firstElementChild.clientHeight : 0
		// scriptiq.style.height = editorHeight + 'px'
		// if(context.components.ScriptIQ) context.components.ScriptIQ.resize()
		let style = chartArea.node.style
		style.width = chartArea.width - sidePanelWidth +'px'
		style.height = chartArea.height - /*CIQ.stripPX(style.top) -*/ bottomPanelHeight + 'px'
	}

	render() {
		let props = this.props
		let quoteFeed = props.quoteFeed
		let chartConstructor = props.chartConstructor
		let preferences = props.preferences
		return (
			<div className="cq-chart-container">
			<ChartContext.Provider value={this.state}>
				<UIManger />
				<ChartNav plugins={props.plugins} />
				<ColorPicker />
				{ props.plugins.TradingCentral &&
					<TradingCentralComponents />
				}
				<ChartArea>
					<WrappedChart  
						quoteFeed={quoteFeed}
						chartConstructor={chartConstructor}
						preferences={preferences}
						staticHeadsUp={true}
						dynamicHeadsUp={true}
						addOns={props.addOns}
						plugins={props.plugins}
					/>
				<BottomPanel>
					{ props.plugins.ScriptIQ &&
						<ScriptIQ />
					}
					{/* <ScriptEditor /> */}
				</BottomPanel>
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
AdvancedChart.contextType = ChartContext

