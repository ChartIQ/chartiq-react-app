import React from 'react'
import { ChartTitle as TitleWebComponent } from 'components'

/**
 * Chart title component `<ChartTitle />`
 * 
 * Displays the raw symbol for the chart (`chart.symbol`), including today's change and change percent values for that symbol.
 *
 * @class ChartTitle
 * @extends {React.PureComponent}
 */
export default class ChartTitle extends React.PureComponent {
	render () {
		console.log('ChartTitle')
		return (
			<cq-chart-title>
				<cq-symbol></cq-symbol>
				<cq-chart-price>
					<cq-current-price cq-animate></cq-current-price>
					<cq-change>
						<div className={"ico"}></div>
						<cq-todays-change></cq-todays-change> (
						<cq-todays-change-pct></cq-todays-change-pct>)
					</cq-change>
				</cq-chart-price>
			</cq-chart-title>
			)
	}
}
