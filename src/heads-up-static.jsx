import React from 'react'

import { ChartContext } from './react-chart-context'

export default class StaticHeadsUp extends React.Component {
	componentDidMount() {
		let UIContext = this.context.UIContext
		this.UIHeadsUpStatic = new CIQ.UI.HeadsUp($$$('cq-hu-static'), this.context.UIContext, {autostart: true})
		this.UIHeadsUpStatic.end()
		UIContext.UIHeadsUpStatic = this.UIHeadsUpStatic
		// this.context.setContext({staticHeadsUp: this.UIHeadsUpStatic})
	}

	componentDidUpdate(prevProps, prevState, snap) {

		this.props.enabled?this.UIHeadsUpStatic.begin():this.UIHeadsUpStatic.end()
	}

	render() {
		const staticHeadsUp = 
			<cq-hu-static>
				<div>
					<div>Price</div><cq-hu-price></cq-hu-price>
					<div>Open</div><cq-hu-open></cq-hu-open>
					<div>Close</div><cq-hu-close></cq-hu-close>
				</div>
				<div>
					<div>Vol</div>
					<cq-volume-section>
						<cq-hu-volume></cq-hu-volume>
						<cq-volume-rollup></cq-volume-rollup>
					</cq-volume-section>
					<div>High</div><cq-hu-high></cq-hu-high>
					<div>Low</div><cq-hu-low></cq-hu-low>
				</div>
			</cq-hu-static>

		return ( this.context.UIContext && staticHeadsUp )
	}
}

StaticHeadsUp.contextType = ChartContext;
