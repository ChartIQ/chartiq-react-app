import React from 'react'
import ReactDOM from 'react-dom'
import UIManager from './components/Core/UIManager'
import ChartLookup from './components/Features/ChartLookup'
import WrappedChart from './components/Core/WrappedChart'
import { ChartContext } from './react-chart-context'

export default class BasicChart extends React.Component {
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
		// let KeystrokeHub=new CIQ.UI.KeystrokeHub(document.querySelector("body"), UIContext, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});

		this.state = {
			stx: null,
			UIContext: new CIQ.UI.Context(null, document.querySelector("*[cq-context]")),
			setContext: this.setContext
		}
	}

	render() {
		let quoteFeed = this.props.quoteFeed
		let layout = this.props.layout
		let preferences = this.props.preferences
		return (
			<div className="cq-chart-container">
				<ChartContext.Provider value={this.state}>
					<UIManager />
					<div className={"ciq-nav"}>
						<ChartLookup />
					</div>
					<WrappedChart  quoteFeed={quoteFeed} layout={layout} preferences={preferences} />
				</ChartContext.Provider>
			</div>
		)
	}
}
BasicChart.contextType = ChartContext
