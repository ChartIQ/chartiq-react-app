import React from 'react'
import MenuPeriodicity from './MenuPeriodicity'
import MenuViews from './MenuViews'
import MenuSettings from './MenuSettings'
import MenuStudies from './MenuStudies'
import MenuEvents from './MenuEvents'

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
