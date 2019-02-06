import React from 'react'
import Periodicity from './chart-periodicity'
import ChartViews from './chart-views'
import ChartSettings from './chart-settings'
import ChartStudies from './chart-studies'
import ChartEvents from './chart-events'
import ChartToggles from './chart-toggles'

export default class ChartMenus extends React.Component {
	render () {
		return (
			<>
			<Periodicity />
			<ChartViews />
			<ChartSettings />
			<ChartStudies />
			<ChartEvents />
			<ChartToggles />
			</>
		)
	}
}
