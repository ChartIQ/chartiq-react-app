import React from 'react'
import ChartLookup from '../Features/ChartLookup'
import ChartMenus from '../Menus/ChartMenus'
import ChartToggles from '../Toggles/ChartToggles'
import { ChartContext } from '../../react-chart-context'

export default class ChartNav extends React.Component {
	
	render() {
		const nav = 
			<div className={'ciq-nav'}>
				<ChartLookup />
				<ChartMenus />
				<ChartToggles />
			</div>
		return ( this.context.stx && nav )
	}
}

ChartNav.contextType = ChartContext;
