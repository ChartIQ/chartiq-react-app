import React from 'react'
import ChartLookup from './lookup'
import ChartMenus from './chart-menus'
import { ChartContext } from './react-chart-context'

export default class ChartNav extends React.Component {
	
	render() {
		const nav = 
			<div className={'ciq-nav'}>
				<ChartLookup />
				<ChartMenus />
			</div>
		return ( this.context.stx && nav )
	}
}

ChartNav.contextType = ChartContext;
