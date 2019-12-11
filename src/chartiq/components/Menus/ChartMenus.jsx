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
		const { menus, menu_periodicity, menu_views, menu_display, menu_studies, menu_events, plugins } = this.context.config;

		const mapping = {
			menu_periodicity: <MenuPeriodicity items={menu_periodicity} key={1} />,
			menu_views: <MenuViews items={menu_views} key={2}/>,
			menu_display: <MenuSettings items={menu_display} plugins={plugins} key={3} />,
			menu_studies: <MenuStudies plugins={plugins} filter={menu_studies} key={4} />,
			menu_events: <MenuEvents items={menu_events} key={5} />
		}

		const menuComponents = (menus || []).map(menu => mapping[menu]);

		return (
			<div className="ciq-dropdowns">
				{menuComponents}
				{/* {menu_periodicity && <MenuPeriodicity />}
				{menu_views && <MenuViews />}
				{menu_display && <MenuSettings plugins={this.props.plugins} />}
				{menu_studies && <MenuStudies plugins={this.props.plugins} filter={menu_studies} />}
				{menu_events && <MenuEvents />} */}
			</div>
		);
	}
}

ChartMenus.contextType = ChartContext;
