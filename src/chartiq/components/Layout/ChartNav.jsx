import React from 'react';
import ChartLookup from '../Features/ChartLookup';
import ChartMenus from '../Menus/ChartMenus';
import { ChartToggles, TradeToggles } from '../Toggles';
import { ChartContext } from '../../ChartContext';

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
		const { plugins } = this.props;
		const nav = (
			<div className={'ciq-nav'}>
				<ChartLookup />
				<ChartToggles />
				<div className="ciq-menu-section">
					<ChartMenus plugins={plugins} />
					{plugins && (
						<div className="trade-toggles ciq-toggles">
							<TradeToggles {...plugins} />
						</div>
					)}
				</div>
			</div>
		);
		return this.context.stx && nav;
	}
}

ChartNav.contextType = ChartContext;
