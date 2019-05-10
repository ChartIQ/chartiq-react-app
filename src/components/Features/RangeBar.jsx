import React from 'react'
import { ShowRange } from 'components'
import {ChartContext} from '../../react-chart-context'

/**
 * Range bar component `<RangeBar/>`
 * 
 * Displays a group of buttons to select chart range setting
 *
 * @export
 * @class RangeBar
 * @extends {React.Component}
 */
export default class RangeBar extends React.Component {

	render() {

		return (

<>
	<cq-show-range>
		<div stxtap="set(1,'today');">1D</div>
		<div stxtap="set(5,'day',30,2,'minute');">5D</div>
		<div stxtap="set(1,'month',30,8,'minute');">1M</div>
		<div className={"hide-sm"} stxtap="set(3,'month');">3M</div>
		<div className={"hide-sm"} stxtap="set(6,'month');">6M</div>
		<div className={"hide-sm"} stxtap="set(1,'YTD');">YTD</div>
		<div stxtap="set(1,'year');">1Y</div>
		<div className={"hide-sm"} stxtap="set(5,'year',1,1,'week');">5Y</div>
		<div className={"hide-sm"} stxtap="set(1,'all');">All</div>
	</cq-show-range>
</>

		)
	}
}

RangeBar.contextType = ChartContext

