import React from 'react'
import 'components'

import { ChartContext } from '../../react-chart-context'

export default class SidePanel extends React.Component {

	render() {
		return(
			<React.Fragment>
				<cq-side-panel></cq-side-panel>
			</React.Fragment>
		)
	}
}

SidePanel.contextType = ChartContext