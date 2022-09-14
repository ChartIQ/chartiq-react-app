import React from "react";

export default function ({ config, pluginToggles }) {
	return (
		<>
			<div className='ciq-nav full-screen-hide'>
				<div className='sidenav-toggle ciq-toggles'>
					<cq-toggle
						class='ciq-sidenav'
						cq-member='sidenav'
						cq-toggles='sidenavOn,sidenavOff'
						cq-toggle-classes='active,'
					>
						<span></span>
						<cq-tooltip>More</cq-tooltip>
					</cq-toggle>
				</div>

				<cq-menu class='ciq-search'>
					<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
				</cq-menu>

				<cq-side-nav cq-on='sidenavOn'>
					<div className='icon-toggles ciq-toggles'>
						<cq-toggle class='ciq-draw' cq-member='drawing'>
							<cq-help help-id='drawing_tools_toggle'></cq-help>
							<span></span>
							<cq-tooltip>Draw</cq-tooltip>
						</cq-toggle>
						<cq-info-toggle-dropdown>
							<cq-toggle class='ciq-CH' cq-member='crosshair'>
								<span></span>
								<cq-tooltip><span>Crosshair</span> <span>(Alt + \)</span></cq-tooltip>
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
									<cq-item cq-member='headsUp-static'>
										Show Heads-Up Display
										<span className='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-info-toggle-dropdown>

						<cq-info-toggle-dropdown>
							<cq-toggle class='ciq-HU' cq-member='headsUp'>
								<span></span>
								<cq-tooltip>Info</cq-tooltip>
							</cq-toggle>

							<cq-menu class='ciq-menu toggle-options collapse tooltip-ui'>
								<span></span>
								<cq-menu-dropdown>
									<cq-item cq-member='headsUp-dynamic'>
										Show Dynamic Callout
										<span className='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
									<cq-item cq-member='headsUp-floating'>
										Show Tooltip
										<span className='ciq-radio'>
											<span></span>
										</span>
									</cq-item>
								</cq-menu-dropdown>
							</cq-menu>
						</cq-info-toggle-dropdown>

						<cq-toggle class='ciq-DT tableview-ui' cq-member='tableView'>
							<span></span>
							<cq-tooltip>Table View</cq-tooltip>
						</cq-toggle>
					</div>
				</cq-side-nav>

				<div className='ciq-menu-section'>
					<div className='ciq-dropdowns'>
						<cq-menu class="ciq-menu ciq-grid">
							<span><cq-clickable>Grid</cq-clickable></span>
							<cq-menu-dropdown>
								<cq-item class="ciq-columns"> 
									<span>
										Columns
									</span>
									<cq-grid-size-picker maxrows="1" maxcols="5"></cq-grid-size-picker>
								</cq-item>
								<cq-item stxtap="Layout.addChart('before')" title="Add a new chart before the active chart">Add Before Active</cq-item>
								<cq-item stxtap="Layout.addChart('after')" title="Add a new chart after the active chart">Add After Active</cq-item>
								<cq-item stxtap="Layout.removeChart()">Remove Chart</cq-item>
								<cq-item class="ciq-solo-only">Not available in solo mode</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
				
						<cq-menu class='ciq-menu ciq-display collapse'>
							<cq-clickable
								cq-tooltip-activator
								stxbind='Layout.chartType'
								ciq-no-icon-text='Display'
							>
								<span ciq-menu-icon='true'></span>
								<cq-tooltip></cq-tooltip>
							</cq-clickable>
							<cq-menu-dropdown>
								<cq-menu-dropdown-section class='chart-types'>
									<cq-heading>Chart Types</cq-heading>
									<cq-menu-container cq-name='menuChartStyle'></cq-menu-container>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-aggregations'>
									<cq-separator></cq-separator>
									<cq-heading>Aggregated Types</cq-heading>
									<cq-menu-container cq-name='menuChartAggregates'></cq-menu-container>
								</cq-menu-dropdown-section>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-period'>
							<span>
								<cq-clickable stxbind='Layout.periodicity'>1D</cq-clickable>
							</span>
							<cq-menu-dropdown>
								<cq-menu-container cq-name='menuPeriodicity'></cq-menu-container>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-views collapse'>
							<span>Views</span>
							<cq-menu-dropdown>
								<cq-views></cq-views>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu ciq-studies collapse' cq-focus='input'>
							<span>Studies</span>
							<cq-menu-dropdown>
								<cq-study-legend cq-no-close>
									<cq-section-dynamic>
										<cq-heading>Current Studies</cq-heading>
										<cq-study-legend-content>
											<template cq-study-legend='true'>
												<cq-item>
													<cq-label class='click-to-edit'></cq-label>
													<div className='ciq-icon ciq-close'></div>
												</cq-item>
											</template>
										</cq-study-legend-content>
										<cq-placeholder>
											<div
												stxtap='Layout.clearStudies()'
												className='ciq-btn sm'
												keyboard-selectable='true'
											>
												Clear All
											</div>
										</cq-placeholder>
									</cq-section-dynamic>
								</cq-study-legend>
								<div className='scriptiq-ui'>
									<cq-heading>ScriptIQ</cq-heading>
									<cq-item>
										<cq-clickable
											cq-selector='cq-scriptiq-editor'
											cq-method='open'
										>
											New Script
										</cq-clickable>
									</cq-item>
									<cq-scriptiq-menu></cq-scriptiq-menu>
									<cq-separator></cq-separator>
								</div>
								<cq-heading cq-filter='' cq-filter-min='-1'>
									Studies
								</cq-heading>
								<cq-studies></cq-studies>
							</cq-menu-dropdown>
						</cq-menu>

						{config && config.eventMarkersImplementation && (
							<cq-menu class='ciq-menu stx-markers collapse'>
								<span>Events</span>
								<cq-menu-dropdown>
									<div className='signaliq-ui'>
										<cq-heading>SignalIQ</cq-heading>
										<cq-item>
											<cq-clickable
												cq-selector='cq-signaliq-dialog'
												cq-method='open'
											>
												<cq-plus></cq-plus> New Signal
											</cq-clickable>
										</cq-item>
										<cq-separator></cq-separator>
										<cq-study-legend cq-signal-studies-only cq-no-close>
											<cq-section-dynamic>
												<cq-study-legend-content>
													<template cq-study-legend='true'>
														<cq-item>
															<cq-label class='click-to-edit'></cq-label>
															<div className='ciq-icon ciq-close'></div>
														</cq-item>
													</template>
												</cq-study-legend-content>
											</cq-section-dynamic>
											<cq-separator></cq-separator>
										</cq-study-legend>
									</div>
									<div className="markers-ui">
										<cq-heading>Chart Events</cq-heading>
										<cq-item stxtap="Markers.showMarkers('square')" cq-no-close>Simple Square<span className="ciq-switch"><span></span></span>
										</cq-item>
										<cq-item stxtap="Markers.showMarkers('circle')" cq-no-close>Simple Circle<span className="ciq-switch"><span></span></span>
										</cq-item>
										<cq-item stxtap="Markers.showMarkers('callout')" cq-no-close>Callouts<span className="ciq-switch"><span></span></span>
										</cq-item>
										<cq-item class="ta_markers-ui" stxtap="Markers.showMarkers('trade')" cq-no-close>Trade<span className="ciq-switch"><span></span></span>
										</cq-item>
										<cq-item class="video_markers-ui" stxtap="Markers.showMarkers('video')" cq-no-close>Video<span className="ciq-switch"><span></span></span>
										</cq-item>
										<cq-item stxtap="Markers.showMarkers('helicopter')" cq-no-close>Abstract<span className="ciq-switch"><span></span></span>
										</cq-item>
									</div>
									<div className='timespanevent-ui'>
										<cq-separator></cq-separator>
										<cq-heading>Panel Events</cq-heading>
										<cq-item
											class='span-event'
											stxtap="TimeSpanEvent.showMarkers('Order')"
											cq-no-close
										>
											Order
											<span className='ciq-checkbox ciq-active'>
												<span></span>
											</span>
										</cq-item>
										<cq-item
											class='span-event'
											stxtap="TimeSpanEvent.showMarkers('CEO')"
											cq-no-close
										>
											CEO
											<span className='ciq-checkbox ciq-active'>
												<span></span>
											</span>
										</cq-item>
										<cq-item
											class='span-event'
											stxtap="TimeSpanEvent.showMarkers('News')"
											cq-no-close
										>
											News
											<span className='ciq-checkbox ciq-active'>
												<span></span>
											</span>
										</cq-item>
									</div>
								</cq-menu-dropdown>
							</cq-menu>
						)}

						<cq-menu class='ciq-menu ciq-preferences collapse'>
							<span></span>
							<cq-menu-dropdown>
								<cq-menu-dropdown-section class='chart-preferences'>
									<cq-heading>Chart Preferences</cq-heading>
									<cq-menu-container cq-name='menuChartPreferences'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='y-axis-preferences'>
									<cq-heading>Y-Axis Preferences</cq-heading>
									<cq-menu-container cq-name='menuYAxisPreferences'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-addons'>
									<cq-heading>Additional Features</cq-heading>
									<cq-menu-container cq-name='menuAddOns'></cq-menu-container>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-theme'>
									<cq-heading>Themes</cq-heading>
									<cq-themes></cq-themes>
									<cq-separator></cq-separator>
								</cq-menu-dropdown-section>
								<cq-menu-dropdown-section class='chart-locale'>
									<cq-heading>Locale</cq-heading>
									<cq-item>
										<cq-clickable
											cq-selector='cq-timezone-dialog'
											cq-method='open'
										>
											Change Timezone
										</cq-clickable>
									</cq-item>
									<cq-item stxsetget='Layout.Language()'>
										<cq-flag></cq-flag>
										<cq-language-name>Change Language</cq-language-name>
									</cq-item>
								</cq-menu-dropdown-section>
							</cq-menu-dropdown>
						</cq-menu>
					</div>

					<div className='trade-toggles ciq-toggles'>
						<cq-toggle class='tfc-ui sidebar stx-trade' cq-member='tfc'>
							<span></span>
							<cq-tooltip>Trade</cq-tooltip>
						</cq-toggle>
						<cq-toggle
							class='analystviews-ui stx-analystviews'
							cq-member='analystviews'
						>
							<span></span>
							<cq-tooltip>Analyst Views</cq-tooltip>
						</cq-toggle>
						<cq-toggle
							class='technicalinsights-ui stx-technicalinsights'
							cq-member='technicalinsights'
						>
							<span></span>
							<cq-tooltip>Technical Insights</cq-tooltip>
						</cq-toggle>
					</div>
				</div>
			</div>

			<div>
				<div cq-context-engine=''></div>
			</div>

			<cq-scriptiq class='scriptiq-ui'></cq-scriptiq>

			<cq-analystviews
				class='analystviews-ui'
				token='eZOrIVNU3KR1f0cf6PTUYg=='
				partner='1000'
				disabled
			></cq-analystviews>

			<cq-technicalinsights uid='' lang='en' disabled></cq-technicalinsights>

			<div className="ciq-multi-chart-container-wrapper">
				<div className="ciq-multi-chart-container ciq-multi-chart-reverse">

					<cq-context-wrapper>
						<cq-context>
							<div className='ciq-chart-area'>
								<div className='ciq-chart'>
									<cq-message-toaster
										defaultDisplayTime='10'
										defaultTransition='slide'
										defaultPosition='top'
									></cq-message-toaster>

									<cq-palette-dock>
										<div className='palette-dock-container'>
											<cq-drawing-palette
												class='palette-drawing grid palette-hide'
												docked='true'
												orientation='vertical'
												min-height='300'
												cq-drawing-edit='none'
											></cq-drawing-palette>
											<cq-drawing-settings
												class='palette-settings'
												docked='true'
												hide='true'
												orientation='horizontal'
												min-height='40'
												cq-drawing-edit='none'
											></cq-drawing-settings>
										</div>
									</cq-palette-dock>

									<div className='chartContainer'>
										<stx-hu-tooltip>
											<stx-hu-tooltip-field field='DT'>
												<stx-hu-tooltip-field-name>Date/Time</stx-hu-tooltip-field-name>
												<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
											</stx-hu-tooltip-field>
											<stx-hu-tooltip-field field='Close'>
												<stx-hu-tooltip-field-name></stx-hu-tooltip-field-name>
												<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
											</stx-hu-tooltip-field>
										</stx-hu-tooltip>

										<cq-chart-title cq-marker cq-browser-tab></cq-chart-title>

										<cq-chartcontrol-group
											class='full-screen-show'
											cq-marker
										></cq-chartcontrol-group>

										<cq-comparison-lookup></cq-comparison-lookup>

										<cq-chart-legend></cq-chart-legend>

										<cq-loader></cq-loader>
									</div>
								</div>
								<div className="ciq-multi-chart-controls">
									<span stxtap="addChart('before')" title="New chart before">+ &lt;</span>
									<span stxtap="addChart()" title="New chart after"> &gt; +</span>
									<span>
										<span className="ciq-solo-toggle" stxtap="toggleSolo()" title="Toggle solo mode"></span>
									</span>
								</div>
								<cq-close title="Remove this chart"></cq-close>
							</div>
							<cq-side-panel></cq-side-panel>
						</cq-context>
					</cq-context-wrapper>
				</div>
			</div>

			<cq-abstract-marker cq-type='helicopter'></cq-abstract-marker>

			<cq-attribution></cq-attribution>

			<div className='ciq-footer full-screen-hide'>
				<cq-share-button></cq-share-button>
				<div
					className='shortcuts-ui ciq-shortcut-button'
					stxtap='Layout.showShortcuts()'
					title='Toggle shortcut legend'
				></div>
				<div
					className='help-ui ciq-help-button'
					stxtap='Layout.toggleHelp()'
					title='Toggle Interactive Help'
				></div>
				<cq-show-range></cq-show-range>
			</div>
		

			<div className='cq-context-dialog'>
				<cq-dialog>
					<cq-drawing-context></cq-drawing-context>
				</cq-dialog>

				<cq-dialog>
					<cq-study-context></cq-study-context>
				</cq-dialog>
			</div>
		</>
	);
}
