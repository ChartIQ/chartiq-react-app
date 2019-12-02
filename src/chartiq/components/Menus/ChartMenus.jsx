import React, { PureComponent } from 'react';
import { ChartContext } from '../../ChartContext';

import MenuPeriodicity from './MenuPeriodicity';
import MenuViews from './MenuViews';
import MenuSettings from './MenuSettings';
import MenuStudies from './MenuStudies';
import MenuEvents from './MenuEvents';

/**
 * Chart menu component `<ChartMenus>`
 *
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 *
 * Container component for all ChartIQ UI dropdown menus. Though you may include each menu component
 * individually, using this component ensures that you have all menu components.
 *
 * @export
 * @class ChartMenus
 * @extends {React.PureComponent}
 */
export default class ChartMenus extends PureComponent {
	render() {
		const { menu_periodicity, menu_views } = this.context.config;
		return (
			<div className="ciq-dropdowns">
				{menu_periodicity && <MenuPeriodicity />}
				{menu_views && <MenuViews />}
				<MenuSettings plugins={this.props.plugins} />
				<MenuStudies plugins={this.props.plugins} />
				<MenuEvents />
			</div>
		);
	}
}

ChartMenus.contextType = ChartContext;
