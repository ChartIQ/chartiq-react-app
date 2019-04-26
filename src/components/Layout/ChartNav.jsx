import React from 'react'
import ChartLookup from '../Features/ChartLookup'
import ChartMenus from '../Menus/ChartMenus'
import ChartToggles from '../Toggles/ChartToggles'
import { ChartContext } from '../../react-chart-context'

/**
 * Chart nav component ``<ChartNav>
 * 
 * Container for displaying UI elements in chart header
 *
 * @export
 * @class ChartNav
 * @extends {React.Component}
 */
export default class ChartNav extends React.Component {
	
	render() {
		const nav = 
			<div className={'ciq-nav'}>
				<ChartLookup />
				<div className="ciq-menu-section">
					<ChartMenus />
					<ChartToggles />
				</div>
			</div>
		return ( this.context.stx && nav )
	}
}

ChartNav.contextType = ChartContext;
