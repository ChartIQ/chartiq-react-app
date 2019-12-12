import React from 'react';
import { CIQ } from 'chartiq';
import { ChartContext } from '../../context/ChartContext';

export default class ToggleHUD extends React.Component {
	constructor() {
		super();
		this.toggle = React.createRef();
		this.state = {
			headsUp: '',
			active: false
		};
	}

	componentDidMount() {
		const {
			config: { headsUpDisplayTypes },
			UIContext: {
				stx: { layout }
			}
		} = this.context;

		if (headsUpDisplayTypes) {
			this.updateHeadsUpValue = this.updateHeadsUpValue.bind(this);
			CIQ.UI.observeProperty('headsUp', layout, this.updateHeadsUpValue);
		}
	}

	updateHeadsUpValue({ value }) {
		this.setState(state => ({
			headsUp: value
		}));
	}

	componentWillUnmount() {
		const { layout } = this.context.UIContext.stx;
		CIQ.UI.unobserveProperty('headsUp', layout, this.updateHeadsUpValue);
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
