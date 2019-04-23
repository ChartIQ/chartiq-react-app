import React from 'react'
import MenuPeriodicity from './MenuPeriodicity'
import MenuViews from './MenuViews'
import MenuSettings from './MenuSettings'
import MenuStudies from './MenuStudies'
import MenuEvents from './MenuEvents'

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
 * @extends {React.Component}
 */
export default class ChartMenus extends React.Component {
	render () {
		return (
			<>
			<MenuPeriodicity />
			<MenuViews />
			<MenuSettings />
			<MenuStudies />
			<MenuEvents />
			</>
		)
	}
}
