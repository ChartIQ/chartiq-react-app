import React, { PureComponent } from 'react';

/**
 * Chart legend component equivalent of rendering cq-chart-legend markup
 */
export default class ChartLegend extends PureComponent {
	// Renders default implementation of single markup element cq-comparison-lookup
	render() {
		const { 
			markerLabel = 'Plots',
			cloneToPanelsAs = 'Plots',
			cloneTopanels = true,
			hovershow = true
		} = this.props;
		return (
			<cq-study-legend 
				cq-marker-label={markerLabel} 
				cq-clone-to-panels={cloneToPanelsAs} 
				cq-panel-only={cloneTopanels ? 'true' : null}
				cq-marker
				cq-hovershow={hovershow ? 'true' : null}
				cq-content-keys="cq-label,cq-comparison-label"
				>
				<cq-comparison>
					<cq-comparison-key cq-panel-only cq-all-series>
						<template cq-comparison-item="true">
							<cq-comparison-item>
								<cq-swatch cq-overrides="auto"></cq-swatch>
								<cq-comparison-label>AAPL</cq-comparison-label>
								{/* cq-comparison-price displays the current price with color animation */}
								<cq-comparison-price cq-animate></cq-comparison-price>
								{/* cq-comparison-tick-price displays the price for the active crosshair item */}
								{/* <cq-comparison-tick-price></cq-comparison-tick-price>	*/}
								<cq-comparison-loader></cq-comparison-loader>
								<div className="stx-btn-ico ciq-close"></div>
							</cq-comparison-item>
						</template>
					</cq-comparison-key>
				</cq-comparison>
				<template cq-study-legend="true">
					<cq-item>
						<cq-label></cq-label>
						<span className="ciq-edit"></span>
						<div className="ciq-icon ciq-close"></div>
					</cq-item>
				</template>
			</cq-study-legend>
		);
	}
}
