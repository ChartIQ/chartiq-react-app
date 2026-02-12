import React from "react";

export default function () {
	return (
		<>
			<cq-color-picker></cq-color-picker>
			{/* Begin Nav bar*/}
			<div className='ciq-nav'>
				<cq-toggle class="ciq-lookup-icon" config ="symbolsearch" reader="Entity Search" tooltip="Entity Search" icon="search" help-id="search_symbol_lookup"></cq-toggle>
				<cq-menu class="nav-dropdown ciq-entity" reader="Add Entity" config="entity" text="" icon="compare"></cq-menu>

				<div className="crosssection-ui">
					<div className="icon-toggles ciq-toggles ciq-datepicker-container"></div>
					<cq-menu class="nav-dropdown ciq-datepicker-toggle" config="datepicker" icon="ciq-datepicker-icon" tooltip="Select Date"></cq-menu>
					<div className="ciq-dropdowns">
						<cq-menu class="nav-dropdown" reader="Y axis" config="menuYaxisField" text
							binding="Layout.yaxisField"></cq-menu>
					</div>
				</div>

				<cq-side-nav cq-on="sidenavOn">
					<div className="icon-toggles ciq-toggles">
						<cq-toggle class="ciq-CH" config="crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \)" icon="crosshair"></cq-toggle>
						<cq-menu class="nav-dropdown toggle-options" reader="Crosshair Options" config="crosssection_crosshair"></cq-menu>
					</div>
				</cq-side-nav>

				<div className="ciq-menu-section">
					<div className="ciq-dropdowns">
						<cq-menu class="nav-dropdown ciq-preferences alignright" reader="Preferences" config="menuChartPreferences"
							icon="preferences" tooltip="Preferences"></cq-menu>

					</div>
				</div>
			</div>
			{/* End Nav bar */}

			{/* Begin Chart area */}
			<div className='ciq-chart-area'>
				<div className='ciq-chart'>
					<cq-message-toaster defaultDisplayTime="10" defaultTransition="slide" defaultPosition="top"></cq-message-toaster>
					<div className='chartContainer'>
						<cq-chart-title cq-marker cq-browser-tab cq-activate-symbol-search-on-click></cq-chart-title>
						<cq-loader></cq-loader>

						<cq-legend-crossplot cq-marker-label="Plots" cq-panel-only cq-marker
							cq-hovershow cq-content-keys="cq-comparison-label" class="hovershow">
						</cq-legend-crossplot>
					</div>
					{/* End Chart Container */}
				</div>
				{/* End Chart Box */}
			</div>
			{/* End Chart area */}

			<cq-attribution></cq-attribution>

			<div className="ciq-footer">
				<cq-share-button class="ciq-share-button bottom" reader="Share Chart" icon="share" tooltip="Share"></cq-share-button>
			</div>

			{/* Begin dialogs */}
			<cq-dialogs>
			<cq-dialog>
				<cq-curve-context>
					<div stxtap="CurveEdit.launchTimeSeries()">Launch Time Series</div>
					<div stxtap="CurveEdit.toggleLabel()">Toggle Label</div>
				</cq-curve-context>
			</cq-dialog>
			</cq-dialogs>

			{/* End dialogs */}
		</>
	);
}
