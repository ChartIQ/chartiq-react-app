import React, { PureComponent } from 'react';
import { ChartContext } from '../../context/ChartContext';

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
		const { 
			config: { menus, menuPeriodicity, menuViews, menuDisplay, menuStudies, menuEvents, plugins },
			pluginsInstalled 
		} = this.context;

		const mapping = {
			menuPeriodicity: 	<MenuPeriodicity items={menuPeriodicity} key={1} />,
			menuViews: 				<MenuViews items={menuViews} key={2}/>,
			menuDisplay: 			<MenuSettings items={menuDisplay} pluginsInstalled={pluginsInstalled} key={3} />,
			menuStudies: 			<MenuStudies plugins={plugins} filter={menuStudies} key={4} />,
			menuEvents: 				<MenuEvents items={menuEvents} key={5} />
		}

		const menuComponents = (menus || []).map(menu => mapping[menu]);

		return (
			<div className="ciq-dropdowns">
				{menuComponents}
			</div>
		);
	}
}

ChartMenus.contextType = ChartContext;
