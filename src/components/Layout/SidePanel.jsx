import React from 'react'
import 'components'

import { ChartContext } from '../../react-chart-context'

export default class SidePanel extends React.Component {

	constructor() {
		super()
		this.sidePanelRef = React.createRef()
	}

	componentDidMount() {
		this.context.UIContext.SidePanel = this.sidePanelRef.current
	}

	render() {
		return(
			<React.Fragment>
				<cq-side-panel ref={this.sidePanelRef}>
					{this.props.children}
				</cq-side-panel>
			</React.Fragment>
		)
	}
}

SidePanel.contextType = ChartContext