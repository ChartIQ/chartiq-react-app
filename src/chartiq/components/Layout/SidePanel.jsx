import React from 'react';

import { ChartContext } from '../../ChartContext';

export default class SidePanel extends React.Component {
	constructor() {
		super();
		this.sidePanelRef = React.createRef();
	}

	componentDidMount() {
		const sidePanel = this.sidePanelRef.current;
		// set reference in context required for retrieving size
		sidePanel.context.SidePanel = sidePanel;

		// patch resize required to detect on collapsed / expand in tfc
		const { resizeMyself, context } = sidePanel;
		sidePanel.resizeMyself = function() {
			context.uiLayout = {
				...context.uiLayout,
				sidepanelWidth: sidePanel.nonAnimatedWidth()
			};
			resizeMyself.call(sidePanel);
		};
	}

	render() {
		return (
			<React.Fragment>
				<cq-side-panel ref={this.sidePanelRef}>
					{this.props.children}
				</cq-side-panel>
			</React.Fragment>
		);
	}
}

SidePanel.contextType = ChartContext;
