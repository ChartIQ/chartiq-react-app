import React from 'react';

import { ChartContext } from '../../context/ChartContext';
import { ShareChart, RangeBar } from '../Features';

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
	
	render() {
		const { footerShare } = this.context.config;
		const footer = (
			<div className="ciq-footer">
				{footerShare && <ShareChart />}
				<RangeBar />
			</div>
		);
		return this.context.stx && footer;
	}
}

ChartFooter.contextType = ChartContext;
