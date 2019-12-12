import React from 'react';

import { ChartContext } from '../../context/ChartContext';

export default class BottomPanel extends React.Component {
	constructor() {
		super();
		this.bottomPanelRef = React.createRef();
	}

	componentDidMount() {
		let context = this.context;
		context.registerComponent({ BottomPanel: this });
		this.node = context.UIContext.BottomPanel = this.bottomPanelRef.current;
	}

	render() {
		return (
			<React.Fragment>
				<div className="ciq-bottom-panel" ref={this.bottomPanelRef}>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

BottomPanel.contextType = ChartContext;
