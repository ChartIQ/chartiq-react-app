import React from 'react'
import RangeBar from './range-bar'
import ShareChart from './share-chart'
import {ChartContext} from './react-chart-context'

export default class ChartFooter extends React.Component {
	render () {
		const footer = 
			<div className={'ciq-footer'}>
				<ShareChart />
				<RangeBar/>
			</div>
		return ( this.context.stx && footer	)
	}

}

ChartFooter.contextType = ChartContext;
