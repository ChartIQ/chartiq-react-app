import React from 'react';

import { CIQ } from 'chartiq/js/chartiq';
import ChartLookup from '../Features/ChartLookup';
import ChartMenus from '../Menus/ChartMenus';
import { ChartToggles, TradeToggles } from '../Toggles';
import { ChartContext } from '../../context/ChartContext';

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
		const { 
			headerLeft: { 
				symbolLookup,
				toggles,
			},
			plugins
		} = this.props.config;
		const nav = (
			<div className="ciq-nav full-screen-hide">
				{symbolLookup && <ChartLookup /> }
				{toggles && toggles.length && <ChartToggles toggles={toggles} />}
				<div className="ciq-menu-section">
					<ChartMenus plugins={plugins} />
					{plugins.tfc && CIQ.TFC && (
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
