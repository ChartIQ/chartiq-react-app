import React from 'react'
import ReactDOM from 'react-dom'
import { CIQ } from 'chartiq'
import UIManger from './uiManager'
import ReactColorPicker from './color-picker'
import ChartNav from './chart-nav'
import WrappedChart from './wrapped-chart'
import HelicopterMarker from 'helicopter-marker'
import Dialogs from './dialogs.jsx'
import ChartFooter from './chart-footer'
import { ChartContext } from './react-chart-context'

export default class AdvancedChart extends React.Component {
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
		// var UIStudyEdit=new CIQ.UI.StudyEdit(null, UIContext);
		// var UIDrawingEdit = new CIQ.UI.DrawingEdit(null, UIContext);

		this.state = {
			stx: null,
			UIContext: UIContext,
			setContext: this.setContext
		}
	}

	componentDidUpdate() {
		console.log('AdvancedChart componentDidUpdate')
		CIQ.UI.begin()
		CIQ.UI.BaseComponent.nextTick()
	}

	render() {
		let quoteFeed = this.props.quoteFeed
		let chartConstructor = this.props.chartConstructor
		let preferences = this.props.preferences
		return (
			<ChartContext.Provider value={this.state}>
				<UIManger />
				<ChartNav />
				<ReactColorPicker />
				<WrappedChart  quoteFeed={quoteFeed} chartConstructor={chartConstructor
				} preferences={preferences} staticHeadsUp={true} dynamicHeadsUp={true} />
				<ChartFooter />
				<Dialogs />
			</ChartContext.Provider>
		)
	}
}
AdvancedChart.contextType = ChartContext

