import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import { ChartContext } from '../../context/ChartContext';

/**
 * Static Heads Up component `<HeadsUpStatic/>`
 *
 * UI widget to display detailed chart data, in a fixed position, corresponding to the mouse pointer as it passes over the chart.
 *
 * @export
 * @class HeadsUpStatic
 * @extends {React.Component}
 */
export default class HeadsUpStatic extends React.Component {
	constructor() {
		super();
		this.node = React.createRef();
		this.prevVal = false;
	}

	componentDidMount() {
		const { UIContext } = this.context;
		const { layout } = UIContext.stx;

		this.UIHeadsUpStatic = new CIQ.UI.HeadsUp(
			this.node.current,
			this.context.UIContext,
			{ autostart: true }
		);
		this.UIHeadsUpStatic.end();

		this.updateHeadsUp = this.updateHeadsUp.bind(this);
		CIQ.UI.observeProperty('headsUp', layout, this.updateHeadsUp);
	}

	updateHeadsUp({ value }) {
		const isDynamic = value === 'static';
		if (this.prevVal !== isDynamic) {
			this.UIHeadsUpStatic[isDynamic ? 'begin' : 'end']();
			this.prevVal = isDynamic;
		}
	}

	componentWillUnmount() {
		const { layout } = this.context.UIContext.stx;
		CIQ.UI.unobserveProperty('headsUp', layout, this.updateHeadsUp);
	}

	render() {
		const staticHeadsUp = (
			<cq-hu-static ref={this.node}>
				<div>
					<div>Price</div>
					<cq-hu-price></cq-hu-price>
					<div>Open</div>
					<cq-hu-open></cq-hu-open>
					<div>Close</div>
					<cq-hu-close></cq-hu-close>
				</div>
				<div>
					<div>Vol</div>
					<cq-volume-section>
						<cq-hu-volume></cq-hu-volume>
						<cq-volume-rollup></cq-volume-rollup>
					</cq-volume-section>
					<div>High</div>
					<cq-hu-high></cq-hu-high>
					<div>Low</div>
					<cq-hu-low></cq-hu-low>
				</div>
			</cq-hu-static>
		);

		return this.context.UIContext && staticHeadsUp;
	}
}

HeadsUpStatic.contextType = ChartContext;
