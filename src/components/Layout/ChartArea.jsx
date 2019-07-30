import React from 'react'
import { ChartContext } from '../../react-chart-context'

export default class ChartArea extends React.Component {
	constructor() {
		super()
		this.chartAreaRef = React.createRef()
	}

	componentDidMount() {
		let ref = this.chartAreaRef.current
		this.context.setContext({chartArea: {
				width: ref.clientWidth,
				height: ref.clientHeight,
				node: ref
			}
		})
	}

	resizeChart() {

	}

	render() {
		return(
		<React.Fragment>
			<div className='ciq-chart-area' ref={this.chartAreaRef}>
				{this.props.children}
			</div>
		</React.Fragment>
		)
	}
}

ChartArea.contextType = ChartContext