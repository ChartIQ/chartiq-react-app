import React from 'react'
import { CIQ } from 'chartiq'
import { ChartIQChart } from 'components'
import TitleOverlay from '../Layout/TitleOverlay'
import ToolbarDrawing from '../Features/ToolbarDrawing'
import LoadingWidget from './LoadingWidget'
import HeadsUpStatic from '../Features/HeadsUpStatic'
import HeadsUpDynamic from '../Features/HeadsUpDynamic'
import MarkerAbstract from '../Features/MarkerAbstract'
import DataAttribution from '../Features/DataAttribution'
import { ChartContext } from '../../react-chart-context'

/**
 * Wrapped chart component `<WrappedChart/>`.
 * 
 * Renders ChartIQ chart canvas and associated DOM elements. The wrapped chart itself has no user interface. You may 
 * use the provided components to add user controls suitable to your project. See components `<BasicChart>` or 
 * `<AdvancedChart>` in this project for reference.
 *
 * @export
 * @class WrappedChart
 * @extends {React.Component}
 */
export default class WrappedChart extends React.Component {

	constructor (props) {
		super(props)

		this.createEngine = container => {
			var config = {container: container, chart: props.chartConstructor, preferences: props.preferences}
			this.stxx = container.stxx = new CIQ.ChartEngine(config)
			container.CIQ = CIQ
			container.$$$ = $$$
			container.startChart(this.stxx, this.feed, {refreshInterval: 1, bufferSize: 200})
			this.context.setContext({stx: this.stxx})
		}

		this.engineRef = React.createRef()
		this.feed = this.props.quoteFeed || quoteFeedSimulator
	}

	componentDidMount() {
		this.createEngine(this.engineRef.current);
		window.addEventListener("resize", this.resizeScreen.bind(this));
		this.resizeScreen();
	}

	resizeScreen(){
		let containerWidth = document.querySelector('.cq-chart-container').offsetWidth;

		document.body.classList.remove('break-lg','break-md','break-sm')
		if (containerWidth> 700) {
			document.body.classList.add('break-lg');
		}
		else if (containerWidth <= 700 && containerWidth > 584) {
			document.body.classList.add('break-md');
		}
		else if (containerWidth <= 584) {
			document.body.classList.add('break-sm');
		}
	}

	render () {
		const Comparison = React.forwardRef((props, ref) => (
			ref.current && <ChartComparison forwardeRef={ref} />
		))

		return (
			<React.Fragment>
			<div className={"ciq-chart-area"}>
				<div className={"ciq-chart"}>
					{ this.context.stx && <ToolbarDrawing /> }
					<chartiq-chart class="chartContainer" defer-start="true" animations="false" ref={this.engineRef}>
						{ this.context.stx && <TitleOverlay refProp={this.engineRef} /> }
						<LoadingWidget />
						{this.props.dynamicHeadsUp && this.context.stx && <HeadsUpDynamic />
						}

						{this.props.staticHeadsUp && this.context.stx && <HeadsUpStatic />
						}
						<DataAttribution />
					</chartiq-chart>
					{ this.context.stx && <MarkerAbstract /> }
				</div>
			</div>
			</React.Fragment>
		)
	}
}

WrappedChart.contextType = ChartContext;
