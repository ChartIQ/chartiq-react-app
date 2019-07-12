import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import 'addOns'
import 'markets/marketDefinitionsSample'
import 'markets/marketSymbologySample'
import UIManger from '../components/Core/UIManager'
import ColorPicker from '../components/Features/ColorPicker'
import ChartNav from '../components/Layout/ChartNav'
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
export default class AdvancedChart extends React.Component {
	constructor(props) {
		super(props)

		this.setContext = (update) => {
			this.setState((state) => {
				return Object.assign(this.context, update)
			}) 
			return update
		}

		this.getHeight = (update) => {
			this.setState((state) => {
				return Object.assign(this.context.height, )
			})
		}

		let UIContext=new CIQ.UI.Context(null, document.querySelector("*[cq-context]"));
		let UILayout=new CIQ.UI.Layout(UIContext);
		let KeystrokeHub=new CIQ.UI.KeystrokeHub(document.querySelector("body"), UIContext, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});
		// var UIStudyEdit=new CIQ.UI.StudyEdit(null, UIContext);
		// var UIDrawingEdit = new CIQ.UI.DrawingEdit(null, UIContext);

		this.state = {
			stx: null,
			UIContext: UIContext,
			height: null,
			setContext: this.setContext,
			getHeight: this.getHeight
		}
	}

	componentDidUpdate() {
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
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
				<WrappedChart  
					quoteFeed={quoteFeed}
					chartConstructor={chartConstructor}
					preferences={preferences}
					staticHeadsUp={true}
					dynamicHeadsUp={true}
					addOns={props.addOns}
					plugins={props.plugins}
				/>
				<ChartFooter />
				<ChartDialogs />
			</ChartContext.Provider>
			</div>
		)
	}
}
AdvancedChart.contextType = ChartContext

