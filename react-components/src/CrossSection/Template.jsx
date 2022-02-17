import React from "react";

export default function () {
	return (
		<>
			<cq-color-picker></cq-color-picker>
			{/* Begin Nav bar*/}
			<div className='ciq-nav'>
				<cq-menu class='ciq-search'>
					<cq-lookup
						cq-keystroke-claim
						cq-keystroke-default
						cq-uppercase
						cq-exchanges='futures,govt,muni,corp'
					>
						<cq-lookup-input cq-no-close>
							<input
								type='text'
								spellCheck='false'
								autoComplete='off'
								autoCorrect='off'
								autoCapitalize='none'
								name='symbol'
								placeholder=''
							/>
							<cq-lookup-icon></cq-lookup-icon>
						</cq-lookup-input>
						<cq-lookup-results>
							<cq-lookup-filters cq-no-close>
								<cq-filter className='true'>ALL</cq-filter>
								<cq-filter>BONDS</cq-filter>
								<cq-filter>FUTURES</cq-filter>
							</cq-lookup-filters>
							<cq-scroll></cq-scroll>
						</cq-lookup-results>
					</cq-lookup>
				</cq-menu>

				<div className='crosssection-ui'>
					<div className='icon-toggles ciq-toggles ciq-datepicker-container'>
						<cq-menu class='ciq-datepicker-toggle'>
							<span className='ciq-datepicker-icon'></span>
							<cq-datepicker nav-datepicker>
								<div className='ciq-datepicker-btn-wrapper'>
									<div className='ciq-btn'>CURRENT DATE</div>
								</div>
							</cq-datepicker>
						</cq-menu>
					</div>

					<div className='ciq-dropdowns'>
						<cq-menu class='ciq-menu'>
							<cq-clickable stxbind='Layout.yaxisField' class='ciq-menu-field'>
								Yield
							</cq-clickable>
							<cq-menu-dropdown class='ciq-value-dropdown'>
								<cq-menu-container cq-name='menuYaxisField'></cq-menu-container>
							</cq-menu-dropdown>
						</cq-menu>
					</div>

					<cq-info-toggle-dropdown>
						<cq-toggle class='ciq-CH' cq-member='crosshair'>
							<span></span>
							<cq-tooltip>Crosshair (Alt + \)</cq-tooltip>
						</cq-toggle>

						<cq-menu class='ciq-menu toggle-options collapse'>
							<span></span>
							<cq-menu-dropdown>
								<cq-item cq-member='crosshair'>
									Hide Heads-Up Display
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
								<cq-item cq-member='headsUp-crosssection'>
									Show Heads-Up Display
									<span className='ciq-radio'>
										<span></span>
									</span>
								</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
					</cq-info-toggle-dropdown>
				</div>

				<div className='ciq-menu-section'>
					<div className='ciq-dropdowns'>
						<cq-menu class='ciq-menu ciq-preferences collapse'>
							<span></span>
							<cq-menu-dropdown>
								<cq-menu-dropdown-section class='chart-preferences'>
									<cq-heading>Options</cq-heading>
									<cq-menu-container cq-name='menuChartPreferences'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>

								<cq-menu-dropdown-section>
									<cq-heading>Themes</cq-heading>
									<cq-themes>
										<cq-themes-builtin cq-no-close>
											<template>
												<cq-item></cq-item>
											</template>
										</cq-themes-builtin>
									</cq-themes>
								</cq-menu-dropdown-section>
							</cq-menu-dropdown>
						</cq-menu>
					</div>
				</div>
			</div>
			{/* End Nav bar */}

			{/* Begin Chart area */}
			<div className='ciq-chart-area'>
				<div className='ciq-chart'>
					<div className='chartContainer'>
						<cq-chart-title cq-marker cq-browser-tab>
							<cq-symbol></cq-symbol>
							<cq-chart-price>
								<cq-chart-title-date class='ciq-chart-title-date'></cq-chart-title-date>
								<cq-chart-title-date class='ciq-chart-title-time'></cq-chart-title-date>
							</cq-chart-price>
						</cq-chart-title>
						<cq-loader></cq-loader>

						<cq-curve-comparison
							cq-marker
							class='ciq-comparison ciq-entity-comparison'
						>
							<cq-menu class='cq-comparison-new'>
								<cq-comparison-tap-capture>
									<cq-comparison-add-label class='ciq-no-share'>
										<cq-comparison-plus></cq-comparison-plus>
										<span>Compare</span>
										<span>...</span>
									</cq-comparison-add-label>

									<cq-menu class='ciq-comparison-curve-menu'>
										<cq-menu-dropdown class='ciq-value-dropdown'>
											<cq-item stxtap='Layout.showEntityComparison()'>
												Add Entity
											</cq-item>
											<cq-item stxtap='Layout.showHistoricalComparisonDialog()'>
												Add Historical
											</cq-item>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-comparison-add>
										<cq-comparison-lookup-frame>
											<cq-lookup
												cq-keystroke-claim
												cq-keystroke-default
												cq-uppercase
												cq-exchanges='futures,govt,muni,corp'
											>
												<cq-lookup-input cq-no-close>
													<input
														type='text'
														spellCheck='false'
														autoComplete='off'
														autoCorrect='off'
														autoCapitalize='none'
														name='symbol'
														placeholder=''
													/>
													<cq-lookup-icon></cq-lookup-icon>
												</cq-lookup-input>
												<cq-lookup-results>
													<cq-lookup-filters cq-no-close>
														<cq-filter class='true'>ALL</cq-filter>
														<cq-filter>BONDS</cq-filter>
														<cq-filter>FUTURES</cq-filter>
													</cq-lookup-filters>
													<cq-scroll></cq-scroll>
												</cq-lookup-results>
											</cq-lookup>
										</cq-comparison-lookup-frame>
										<cq-swatch cq-no-close></cq-swatch>
										<span>
											<cq-accept-btn class='stx-btn'>ADD</cq-accept-btn>
										</span>
									</cq-comparison-add>
								</cq-comparison-tap-capture>
							</cq-menu>
						</cq-curve-comparison>

						<cq-study-legend
							cq-marker-label='Plots'
							cq-clone-to-panels='Plots'
							cq-panel-only
							cq-marker
							cq-hovershow
							cq-content-keys='cq-label,cq-comparison-label'
						>
							<cq-curve-comparison>
								<cq-curve-comparison-key cq-panel-only cq-all-series>
									<template cq-comparison-item='true'>
										<cq-comparison-item>
											<cq-swatch cq-overrides='auto'></cq-swatch>
											<cq-comparison-label></cq-comparison-label>
											<cq-comparison-loader></cq-comparison-loader>
											<div className='ciq-close'></div>
										</cq-comparison-item>
									</template>
								</cq-curve-comparison-key>
							</cq-curve-comparison>
							<template cq-study-legend='true'>
								<cq-item>
									<cq-label></cq-label>
									<span className='ciq-edit'></span>
									<div className='ciq-icon ciq-close'></div>
								</cq-item>
							</template>
						</cq-study-legend>
					</div>
					{/* End Chart Container */}
				</div>
				{/* End Chart Box */}
			</div>
			{/* End Chart area */}

			<cq-attribution></cq-attribution>

			<div className='ciq-footer'>
				<cq-share-button></cq-share-button>
			</div>

			{/* Begin dialogs */}
			<cq-dialog>
				<cq-freshness-dialog>
					<h4 className='title'>Set Highlight Duration</h4>
					<cq-close></cq-close>
					<div style={{ textAlign: "center", marginTop: "10px" }}>
						<div>
							<i>Enter number of minutes and hit "Enter"</i>
							<p>
								<input name='freshness' stxtap='Layout.setFreshnessEdit()' />
							</p>
						</div>
						<p>or</p>
						<div className='ciq-btn' stxtap="Layout.setFreshnessEdit('auto')">
							Auto Select
						</div>
					</div>
				</cq-freshness-dialog>
			</cq-dialog>

			<cq-dialog>
				<cq-historical-comparison-dialog>
					<h4 className='title'>Set Historical Comparison</h4>
					<cq-close></cq-close>
					<div className='ciq-dialog-color-option'>
						<div className='ciq-heading'>Color</div>
						<cq-swatch></cq-swatch>
					</div>
					<hr />
					<div className='ciq-options-group' style={{ marginTop: "10px" }}>
						<cq-item stxtap='select()' cq-name='1-day' className='ciq-active'>
							1 Day Ago
							<span className='ciq-radio'>
								<span></span>
							</span>
						</cq-item>
						<cq-item stxtap='select()' cq-name='1-week'>
							1 Week Ago
							<span className='ciq-radio'>
								<span></span>
							</span>
						</cq-item>
						<cq-item stxtap='select()' cq-name='1-month'>
							1 Month Ago
							<span className='ciq-radio'>
								<span></span>
							</span>
						</cq-item>
						<cq-item stxtap='select()' cq-name='1-year'>
							1 Year Ago
							<span className='ciq-radio'>
								<span></span>
							</span>
						</cq-item>
						<cq-item stxtap='select()' cq-name='3-year'>
							3 Years Ago
							<span className='ciq-radio'>
								<span></span>
							</span>
						</cq-item>
						<cq-item stxtap="select('custom')">Custom...</cq-item>
					</div>
					<cq-datepicker comparison-datepicker='true'></cq-datepicker>
					<div
						stxtap='done()'
						style={{ display: "flex", justifyContent: "center" }}
					>
						<div className='ciq-btn'>Done</div>
					</div>
				</cq-historical-comparison-dialog>
			</cq-dialog>

			<cq-dialog>
				{/* If time-series chart is available, set `cq-time-series` to "true" to toggle on time-series related options */}
				<cq-curve-context cq-time-series='false'>
					<div stxtap='CurveEdit.launchTimeSeries()'>Launch Time Series</div>
				</cq-curve-context>
			</cq-dialog>

			{/* End dialogs */}
		</>
	);
}
