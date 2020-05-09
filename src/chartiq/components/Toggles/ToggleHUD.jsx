import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import { ChartContext } from '../../context/ChartContext';

export default class ToggleHUD extends React.Component {
	constructor() {
		super();
		this.toggle = React.createRef();
		this.state = {
			headsUp: '',
			active: false
		};
		this.updateHeadsUpValue = this.updateHeadsUpValue.bind(this);
	}

	componentDidMount() {
		if (!this.context.config.headsUpDisplayTypes) return;

		CIQ.UI.observeProperty(
			'headsUp',
			this.context.stx.layout,
			this.updateHeadsUpValue
		);
	}

	updateHeadsUpValue({ value }) {
		this.setState({ headsUp: value });
	}

	componentWillUnmount() {
		if (!this.context.config.headsUpDisplayTypes) return;

		CIQ.UI.unobserveProperty(
			'headsUp',
			this.context.stx.layout,
			this.updateHeadsUpValue
		);
	}

	render() {
		const { headsUpDisplayTypes } = this.context.config;
		const { headsUp } = this.state;
		return (
			(headsUpDisplayTypes && (
				<cq-toggle
					class="ciq-HU"
					cq-member="headsUp"
					cq-toggles={headsUpDisplayTypes.join(',') + ',null'}
					ref={this.toggle}
				>
					<span></span>
					<cq-tooltip>Info {headsUp || 'off'}</cq-tooltip>
				</cq-toggle>
			)) ||
			null
		);
	}
}

ToggleHUD.contextType = ChartContext;
