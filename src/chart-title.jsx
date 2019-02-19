import React from 'react'
import { ChartTitle } from 'components'

export default class ChartIQTitle extends React.PureComponent {
	render () {
		console.log('ChartTitle')
		return (
			<cq-chart-title style={{position: 'absolute', left: '0px', zIndex: '2'}}>
				<cq-symbol style={{zIndex: 2}}></cq-symbol>
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
