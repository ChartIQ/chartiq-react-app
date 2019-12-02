import React, { PureComponent } from 'react';
import { ChartContext } from '../../ChartContext';
/**
 * Chart menu component `<MenuPeriodicity>`
 *
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 *
 * Dropdown menu of chart periodicity settings
 *
 * @export
 * @class MenuPeriodicity
 * @extends {React.Component}
 */

export default class MenuPeriodicity extends PureComponent {
	render() {
		const { menu_periodicity } = this.context.config;
		const items = menu_periodicity.map(
			({ label, periodicity, interval, timeUnit }, index) =>
				periodicity ? (
					<cq-item
						stxtap={`Layout.setPeriodicity(${periodicity},${interval},'${timeUnit}')`}
						key={index}
					>
						{label}
					</cq-item>
				) : (
					<cq-separator key={index}></cq-separator>
				)
		);
		return (
			<cq-menu class="ciq-menu ciq-period">
				<span>
					<cq-clickable stxbind="Layout.periodicity">1D</cq-clickable>
				</span>
				<cq-menu-dropdown>{items}</cq-menu-dropdown>
			</cq-menu>
		);
	}
}

MenuPeriodicity.contextType = ChartContext;
