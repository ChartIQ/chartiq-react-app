import React from 'react'
import 'components'

import { ChartContext } from '../../react-chart-context'

export default class BottomPanel extends React.Component {

	constructor() {
		super()
		this.bottomPanelRef = React.createRef()
	}
	
	componentDidMount() {
		let context = this.context
		// context.setContext({components: {BottomPanel: this}})
		context.components.BottomPanel = this
		this.node = context.UIContext.BottomPanel = this.bottomPanelRef.current
	}

	resize() {
		console.log(React.Children.count(this.props.children))
		React.Children.forEach(this.props.children, (me ,child) => { 
			// console.log(me === this)
			console.log(child)
			if(child.resize) child.resize() 
		})
	}

	render() {
		return(
			<React.Fragment>
				<div className="ciq-bottom-panel" ref={this.bottomPanelRef}>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}

BottomPanel.contextType = ChartContext