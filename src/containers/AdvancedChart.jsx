import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'addOns'
import 'perfectScrollbar'
import 'markets/marketDefinitionsSample'
import 'markets/marketSymbologySample'
import UIManager from '../components/Core/UIManager'
import ColorPicker from '../components/Features/ColorPicker'
import ChartNav from '../components/Layout/ChartNav'
import ChartArea from '../components/Layout/ChartArea'
import WrappedChart from '../components/Core/WrappedChart'
import SidePanel from '../components/Layout/SidePanel'
import ScriptIQ from '../components/Plugins/ScriptIQ/ScriptIQ'
import TradePanel from '../components/Plugins/TFC/TradePanel'
import ChartDialogs from '../components/Dialogs/ChartDialogs'
import ChartFooter from '../components/Layout/ChartFooter'
import { ChartContext } from '../react-chart-context'
import BottomPanel from '../components/Layout/BottomPanel';
import MarketDepth from '../components/Plugins/CryptoIQ/MarketDepth';
import Plugins from '../components/Core/Plugins';

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
			registerComponent: (component) => { this.registerComponent(component) },
			resize: () => { this.resizeScreen() }
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.resizeScreen.bind(this));
	}

	componentDidUpdate() {
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
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
		let parentWidth = chartArea.node.parentElement.clientWidth
		let sidePanel
		let sideNav = document.querySelector('.sidenav')
		let sideNavWidth = 0
		if(sideNav) sideNavWidth = sideNav.clientWidth;
		if(context.UIContext.SidePanel)  sidePanel = context.UIContext.SidePanel
		let sidePanelWidth = sidePanel? sidePanel.nonAnimatedWidth() : 0
		chartArea.node.style.width = (parentWidth - sidePanelWidth - sideNavWidth) + 'px'
		chartArea.node.style.left = sideNavWidth + 'px'
	}

	render() {
		let props = this.props
		let quoteFeed = props.quoteFeed
		let chartConstructor = props.chartConstructor
		let preferences = props.preferences
		return (
			<ChartContext.Provider value={this.state}>
			<div className="cq-chart-container">
				<UIManager />
				<ChartNav plugins={props.plugins} />
				<ColorPicker />
				{ props.plugins && this.state.stx && <Plugins {...props.plugins} />}
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
					<MarketDepth plugins={props.plugins}/>
				</ChartArea>
				<BottomPanel>
					{ props.plugins.ScriptIQ &&
						<ScriptIQ />
					}
					{/* <ScriptEditor /> */}
				</BottomPanel>
				<SidePanel>
					{props.plugins && props.plugins.TFC &&
						<TradePanel />
					}
				</SidePanel>
				<ChartDialogs />
			</div>
			<ChartFooter />
			</ChartContext.Provider>
		)
	}
}
AdvancedChart.contextType = ChartContext

