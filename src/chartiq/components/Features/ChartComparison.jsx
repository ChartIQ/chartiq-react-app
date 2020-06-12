import React, { PureComponent } from 'react';

/**
 * Chart symbol comparison component `<ChartComparison>`
 *
 * UI widget to select alternative symbols for comparison. Can be used with any market
 * configured by CIQ.Market or any formula.
 *
 */
export default class ChartComparison extends PureComponent {
	// Renders default implementation of single markup element cq-comparison-lookup
	render() {
		return (
			<cq-comparison cq-marker>
				<cq-menu class="cq-comparison-new" cq-focus="input">
					<cq-comparison-add-label class="ciq-no-share">
						<cq-comparison-plus></cq-comparison-plus><span>Compare</span><span>...</span>
					</cq-comparison-add-label>
					<cq-comparison-add>
						<cq-comparison-lookup-frame>
							<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
						</cq-comparison-lookup-frame>
						<cq-swatch cq-no-close></cq-swatch>
						<span><cq-accept-btn class="stx-btn">ADD</cq-accept-btn></span>
					</cq-comparison-add>
				</cq-menu>
			</cq-comparison>
		);
	}
}
