import React from 'react'
import { ChartContext } from '../../react-chart-context'

/**
 * Dynamic Heads Up component `<HeadsUpDynamic/>`
 * 
 * UI widget to display detailed chart data interactively, following the mouse pointer as it passes over the chart.
 *
 * @export
 * @class HeadsUpDynamic
 * @extends {React.Component}
 */
export default class HeadsUpDynamic extends React.Component {
	componentDidMount() {
		let UIContext = this.context.UIContext
		this.UIHeadsUpDynamic = new CIQ.UI.HeadsUp($("cq-hu-dynamic"), UIContext, {followMouse:true, autoStart: false})
		this.UIHeadsUpDynamic.end()
		UIContext.UIHeadsUpDynamic = this.UIHeadsUpDynamic
		// this.context.setContext({dynamicHeadsUp: this.UIHeadsUpDynamic})
	}

	componentDidUpdate(prevProps, prevState, snap) {

		this.props.enabled?this.UIHeadsUpDynamic.begin():this.UIHeadsUpDynamic.end()
	}

	render() {
		const dynamicHeadsUp = 
			<cq-hu-dynamic>
					<svg version="1.1" x="0px" y="0px" viewBox="0 0 215 140" enableBackground="new 0 0 215 140">
					<defs>
						<filter id="ciq-hu-shadow" height="130%">
							<feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
							<feOffset dx="0" dy="1" result="offsetblur"/>
							<feComponentTransfer>
								<feFuncA type="linear" slope="0.2"/>
							</feComponentTransfer>
							<feMerge>
								<feMergeNode/>
								<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
					</defs>
					<polygon className="ciq-hu-bg" fill="#2A51D0" points="198.4,124.4 1,124.4 1,1 214,1 214,137.8" filter="url(#ciq-hu-shadow)"/>
					<path className="ciq-hu-stroke" fill="#398DFF" d="M213,2v133.6l-13.7-11.8l-0.6-0.5H198H2V2H213 M215,0H0v125.4h198l17,14.6V0L215,0z"/>
				</svg>
				<div>
					<cq-hu-col1>
						<cq-hu-date></cq-hu-date>
						<cq-hu-price></cq-hu-price>
						<cq-volume-grouping>
							<div>Volume</div>
							<div><cq-volume-visual></cq-volume-visual></div>
							<div><cq-hu-volume></cq-hu-volume><cq-volume-rollup></cq-volume-rollup></div>
						</cq-volume-grouping>
					</cq-hu-col1>
					<cq-hu-col2>
						<div>Open</div><cq-hu-open></cq-hu-open>
						<div>Close</div><cq-hu-close></cq-hu-close>
						<div>High</div><cq-hu-high></cq-hu-high>
						<div>Low</div><cq-hu-low></cq-hu-low>
					</cq-hu-col2>
				</div>

			</cq-hu-dynamic>

		return ( this.context.UIContext && dynamicHeadsUp )
	}
}

HeadsUpDynamic.contextType = ChartContext;
