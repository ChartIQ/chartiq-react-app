import React from 'react';
import { ChartContext } from '../../../context/ChartContext';

export default class ToggleTradePanel extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = React.createRef();
	}

	componentDidMount() {
		this.setToggleCallback(this.toggle.current);
	}

	setToggleCallback(node) {
		const { stx, UIContext: { topNode: contextContainer } } = this.context;

		node.registerCallback(function(value) {
			const sidePanel = contextContainer.querySelector('cq-side-panel');
			const tradePanel = sidePanel.querySelector('.stx-trade-panel');
			if (value) {
				sidePanel.open({ selector: '.stx-trade-panel', className: 'active' });
				tradePanel.classList.remove('closed');
				stx.layout.sidenav = 'sidenavOff'; // for small screen size - break-sm hide sidenav when turning on tfc side panel
			} else {
				sidePanel.close();
				tradePanel.classList.add('closed');
			}
		});
	}

	render() {
		const { uiLayout: { sidepanel } = {} } = this.context.UIContext;
		return (
			<React.Fragment>
				<cq-toggle
					class={`tfc-ui-sidebar stx-trade ${sidepanel ? 'active' : ''}`}
					ref={this.toggle}
				>
					<span></span>
					<cq-tooltip>Trade</cq-tooltip>
				</cq-toggle>
			</React.Fragment>
		);
	}
}
ToggleTradePanel.contextType = ChartContext;
