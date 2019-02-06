import React from 'react'
import { ShowRange } from './js/components'
import {ChartContext} from './react-chart-context'

export default class RangeBar extends React.Component {
	
	componentDidMount() {

	}

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

