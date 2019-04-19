import React from 'react'
import { ChartIQChart } from 'components'
import { ChartContext } from '../../react-chart-context'

export default class UIManager extends React.Component {
	constructor(props) {
		super(props)
		let context = this.context
		this.setContext = (update) => { this.context = update }
	}

	render() {
		return (
			<cq-ui-manager></cq-ui-manager>
		)		
	}
}

UIManager.contextType = ChartContext;
