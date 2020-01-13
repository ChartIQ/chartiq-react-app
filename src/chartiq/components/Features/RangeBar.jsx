import React from 'react';
import { ChartContext } from '../../context/ChartContext';

/**
 * Range bar component `<RangeBar/>`
 *
 * Displays a group of buttons to select chart range setting
 *
 * @export
 * @class RangeBar
 * @extends {React.Component}
 */
export default class RangeBar extends React.Component {
	render() {
		const { footerRange: rangeItems } = this.context.config;
		if (!rangeItems) return null;
		const toString = value => value && JSON.stringify(value);

		const items = rangeItems.map(
			({ label, multiplier, base, interval, period, timeUnit, available }) => {
				const tapAction = `set(${multiplier}, ${toString(base)}, ${interval}, ${period}, ${toString(
					timeUnit
				)})`;
				const className = available ? '' : 'hide-sm';
				return (
					<div stxtap={tapAction} className={className} key={label}>
						{label}
					</div>
				);
			}
		);

		return (
			<>
				<cq-show-range>{items}</cq-show-range>
			</>
		);
	}
}

RangeBar.contextType = ChartContext;
