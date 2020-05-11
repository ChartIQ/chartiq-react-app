import React from 'react';

import { ChartContext } from '../../context/ChartContext';

export default class SidePanel extends React.Component {
	constructor() {
		super();
		this.sidePanelRef = React.createRef();
	}

	componentDidMount() {
		const sidePanel = this.sidePanelRef.current;
		const { UIContext } = this.context;

		// patch resize required to detect on collapsed / expand in tfc
		const { resizeMyself } = sidePanel;
		sidePanel.resizeMyself = () => {
			const sidepanelWidth = sidePanel.nonAnimatedWidth();
			UIContext.uiLayout = {
				...UIContext.uiLayout,
				sidepanelWidth
			}
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
