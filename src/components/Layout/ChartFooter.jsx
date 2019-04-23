import React from 'react'
import RangeBar from '../Features/RangeBar'
import ShareChart from '../Features/ShareChart'
import {ChartContext} from '../../react-chart-context'

/**
 * Chart footer compaonent `<ChartFooter>`
 * 
 * Container for placing UI elements in chart footer
 *
 * @export
 * @class ChartFooter
 * @extends {React.Component}
 */
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
