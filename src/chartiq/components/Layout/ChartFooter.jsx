import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
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
	
	componentDidMount() {
		const { footerShare } = this.context.config;
		if (footerShare && !CIQ.Share) {
			console.warn(
				'Share is set true in configuration but share is not available in license. ' +
				'Set config.footerShare to false to disable this warning' )
		}
	}
	
	render() {
		const { footerShare } = this.context.config;
		const shareAvailable = !!CIQ.Share;
		const footer = (
			<div className="ciq-footer full-screen-hide">
				{footerShare && shareAvailable && <ShareChart />}
				<RangeBar />
			</div>
		);
		return this.context.stx && footer;
	}
}

ChartFooter.contextType = ChartContext;
