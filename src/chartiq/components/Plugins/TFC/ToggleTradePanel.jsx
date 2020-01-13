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
		const { stx, updateChartSize, UIContext: { node: contextContainer } } = this.context;

		node.registerCallback(function(value) {
			const sidePanel = $('cq-side-panel', contextContainer)[0];
			if (value) {
				sidePanel.open({ selector: '.stx-trade-panel', className: 'active' });
				$('.stx-trade-panel', sidePanel).removeClass('closed');
				stx.layout.sidenav = 'sidenavOff'; // for small screen size - break-sm hide sidenav when turning on tfc side panel
			} else {
				sidePanel.close();
				$('.stx-trade-panel', sidePanel).addClass('closed');
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
