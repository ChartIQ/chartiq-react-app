import React from 'react'
import ChartLookup from '../Features/ChartLookup'
import ChartMenus from '../Menus/ChartMenus'
import ChartToggles from '../Toggles/ChartToggles'
import { ChartContext } from '../../react-chart-context'
import TradeToggles from '../Toggles/TradeToggles';

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
		const props = this.props
		const nav = 
			<div className={'ciq-nav'}>
				<ChartLookup />
				<ChartToggles />
				<div className="ciq-menu-section">
					<ChartMenus plugins={props.plugins}/>
					{props.plugins && 
					<div className="trade-toggles ciq-toggles">
						<TradeToggles {...props.plugins} />
					</div>
					}
				</div>
			</div>
		return ( this.context.stx && nav )
	}
}

ChartNav.contextType = ChartContext;
