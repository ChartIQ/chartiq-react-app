import React from 'react'
import { Lookup, Menu, MenuDropDown, Scroll }from 'components'
import { ChartContext } from '../../react-chart-context'

export default class MenuPeriodicity extends React.Component {

	render() {
		return (
<cq-menu class="ciq-menu ciq-period">
	<span><cq-clickable stxbind="Layout.periodicity">1D</cq-clickable></span>
	<cq-menu-dropdown>
		<cq-item stxtap="Layout.setPeriodicity(1,1,'day')">1 D</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(1,1,'week')">1 W</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(1,1,'month')">1 Mo</cq-item>
		<cq-separator></cq-separator>
		<cq-item stxtap="Layout.setPeriodicity(1,1,'minute')">1 Min</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(1,5,'minute')">5 Min</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(1,10,'minute')">10 Min</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(3,5,'minute')">15 Min</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(1,30,'minute')">30 Min</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(2,30,'minute')">1 Hour</cq-item>
		<cq-item stxtap="Layout.setPeriodicity(8,30,'minute')">4 Hour</cq-item>
	</cq-menu-dropdown>
</cq-menu>
		)
	}
}
