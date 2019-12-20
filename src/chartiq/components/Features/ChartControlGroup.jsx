import React from 'react'
import ToggleDrawing from '../Toggles/ToggleDrawing'
import ChartLookup from '../Features/ChartLookup'

/**
 * Chart title component `<ChartTitle />`
 * 
 * Displays the raw symbol for the chart (`chart.symbol`), including today's change and change percent values for that symbol.
 *
 * @class ChartTitle
 * @extends {React.PureComponent}
 */
export default class ChartControlGroup extends React.PureComponent {
	render () {
		return (
			<>
			<cq-chartcontrol-group class="full-screen-show">
				<ChartLookup />
				<ToggleDrawing />
				<cq-toggle class="ciq-CH" cq-member="crosshair"><span></span><cq-tooltip>Crosshair</cq-tooltip></cq-toggle>
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
						<cq-separator></cq-separator>
						<cq-item stxtap="Layout.setPeriodicity(1,1,'second')">1 Sec</cq-item>
						<cq-item stxtap="Layout.setPeriodicity(1,10,'second')">10 Sec</cq-item>
						<cq-item stxtap="Layout.setPeriodicity(1,30,'second')">30 Sec</cq-item>
						<cq-separator></cq-separator>
						<cq-item stxtap="Layout.setPeriodicity(1,250,'millisecond')">250 MSec</cq-item>
					</cq-menu-dropdown>
				</cq-menu>
			</cq-chartcontrol-group>
			</>
			)
	}
}