import React from 'react'
// import { ChartIQChart } from 'components'
import ChartIQTitle from './chart-title'
import DrawToolbar from './drawing-toolbar'
import ChartComparison from './comparison'
import LoadingWidget from './loader'
import DrawingMenus from './drawing-dialog'
import StaticHeadsUp from './heads-up-static'
import DynamicHeadsUp from './heads-up-dynamic'
import HelicopterMarker from './helicopter-marker'
import { ChartContext } from './react-chart-context'

export default class WrappedChart extends React.Component {

	constructor (props) {
		super(props)

		console.log('WrappedChart constructor')
		this.createEngine = container => {
			console.log(`createEngine ref continer: ${container}`)
			var config = Object.assign({container: container}, props.chartConstructor)
			this.stxx = container.stxx = new CIQ.ChartEngine(config)
			container.startChart()
			this.context.setContext({stx: this.stxx})
		}

		this.engineRef = React.createRef()
	}

	componentDidMount() {
		this.createEngine(this.engineRef.current)
		console.log('WrappedComponent mounted... ')
	}

	render () {
		console.log('render WrappedChart')
		const Comparison = React.forwardRef((props, ref) => (
			ref.current && <ChartComparison forwardeRef={ref} />
		))

		return (
			<React.Fragment>
			<div className={"ciq-chart-area"}>
				<div className={"ciq-chart"}>
					{ this.context.stx && <DrawToolbar /> }
					<chartiq-chart class="chartContainer" defer-start="true" ref={this.engineRef}>
						<ChartIQTitle />
						<Comparison ref={this.engineRef} />
						<LoadingWidget />
						{this.props.dynamicHeadsUp && this.context.stx && <DynamicHeadsUp />
						}

						{this.props.staticHeadsUp && this.context.stx && <StaticHeadsUp />
						}
					</chartiq-chart>
					{ this.context.stx && <HelicopterMarker /> }
				</div>
			</div>
			</React.Fragment>
		)
	}
}

WrappedChart.contextType = ChartContext;
