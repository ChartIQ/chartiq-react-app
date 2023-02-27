import React from "react";

export default function () {
	return (
		<>
			<cq-chart-instructions role='contentinfo'></cq-chart-instructions>

			<div className='ciq-nav full-screen-hide' role='navigation'>
				<div className='sidenav-toggle ciq-toggles'>
					<cq-toggle
						class='ciq-sidenav'
						cq-member='sidenav'
						cq-toggles='sidenavOn,sidenavOff'
						cq-toggle-classes='active,'
						keyboard-navigation='false'
					>
						<span></span>
						<cq-tooltip>More</cq-tooltip>
					</cq-toggle>
				</div>

				<cq-clickable role="button" class="symbol-search" cq-selector="cq-lookup-dialog" cq-method="open" delay="true">
					<span className="ciq-lookup-icon"></span>
					<cq-tooltip>Symbol Search</cq-tooltip>
				</cq-clickable>

				<cq-clickable
					role="button"
					class="symbol-search"
					cq-selector="cq-lookup-dialog"
					cq-method="open"
					comparison="true"
					delay="true"
				>
					<span className="ciq-comparison-icon"></span>
					<cq-tooltip>Add Comparison</cq-tooltip>
				</cq-clickable>

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

						<cq-toggle class='ciq-DT tableview-ui' cq-member='tableView' role='button' aria-pressed='false'>
							<span></span>
							<cq-tooltip>Table View</cq-tooltip>
						</cq-toggle>
					</div>
				</cq-side-nav>

				<div className='ciq-menu-section'>
					<div className='ciq-dropdowns'>
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
								<cq-menu-dropdown-section class='chart-aggregations advanced-ui'>
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
								<cq-study-menu-manager></cq-study-menu-manager>
							</cq-menu-dropdown>
						</cq-menu>

						<cq-menu class='ciq-menu stx-markers collapse'>
							<span>Events</span>
							<cq-menu-dropdown>
								<div className="markers-ui">
									<cq-heading>Chart Events</cq-heading>
									<cq-item stxtap="Markers.showMarkers('square')" cq-no-close>
										Simple Square
										<span className='ciq-switch'>
											<span></span>
										</span>
									</cq-item>
									<cq-item stxtap="Markers.showMarkers('circle')" cq-no-close>
										Simple Circle
										<span className='ciq-switch'>
											<span></span>
										</span>
									</cq-item>
									<cq-item stxtap="Markers.showMarkers('callout')" cq-no-close>
										Callouts
										<span className='ciq-switch'>
											<span></span>
										</span>
									</cq-item>
									<cq-item
										class='ta_markers-ui'
										stxtap="Markers.showMarkers('trade')"
										cq-no-close
									>
										Trade
										<span className='ciq-switch'>
											<span></span>
										</span>
									</cq-item>
									<cq-item
										class='video_markers-ui'
										stxtap="Markers.showMarkers('video')"
										cq-no-close
									>
										Video
										<span className='ciq-switch'>
											<span></span>
										</span>
									</cq-item>
									<cq-item stxtap="Markers.showMarkers('helicopter')" cq-no-close>
										Abstract
										<span className='ciq-switch'>
											<span></span>
										</span>
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
										<span className='ciq-switch ciq-active'>
											<span></span>
										</span>
									</cq-item>
									<cq-item
										class='span-event'
										stxtap="TimeSpanEvent.showMarkers('CEO')"
										cq-no-close
									>
										CEO
										<span className='ciq-switch ciq-active'>
											<span></span>
										</span>
									</cq-item>
									<cq-item
										class='span-event'
										stxtap="TimeSpanEvent.showMarkers('News')"
										cq-no-close
									>
										News
										<span className='ciq-switch ciq-active'>
											<span></span>
										</span>
									</cq-item>
								</div>
							</cq-menu-dropdown>
						</cq-menu>

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

					<div className="ciq-toggles"></div>
				</div>
			</div>

			<div className='ciq-chart-area' role='main'>
				<div chartarea='true'>
					<div id='flexContainer'>
						<div id='cryptoGroup1'>
							<div id='tradeHistoryContainer'>
								<cq-tradehistory cq-active>
									<cq-tradehistory-table>
										<cq-scroll cq-no-claim>
											<cq-tradehistory-body maxrows='500'></cq-tradehistory-body>
										</cq-scroll>
										<div pie-chart='true'>
											<span>Money Flow</span>
											<div></div>
										</div>
									</cq-tradehistory-table>
									<template>
										<cq-item>
											<div col='time'>Time</div>
											<div col='qty'>Qty</div>
											<div col='price'>Price</div>
											<div col='amount'>Amount</div>
										</cq-item>
									</template>
								</cq-tradehistory>
							</div>
						</div>
						<div id='cryptoGroup2'>
							<div id='marketDepthBookmark'></div>
							<div id='orderBookContainer'>
								<cq-orderbook cq-active>
									<cq-orderbook-table reverse>
										<cq-scroll cq-no-claim>
											<cq-orderbook-bids></cq-orderbook-bids>
										</cq-scroll>
									</cq-orderbook-table>
									<cq-orderbook-table>
										<cq-scroll cq-no-claim>
											<cq-orderbook-asks></cq-orderbook-asks>
										</cq-scroll>
									</cq-orderbook-table>
									<template>
										<cq-item cq-size-shading>
											<div col='price'>Price</div>
											<div col='size'>Size</div>
											<div col='amount'>Amount</div>
										</cq-item>
									</template>
								</cq-orderbook>
							</div>
						</div>

						<div
							id='mainChartGroup'
							packager-append-child='div.ciq-chart-area div.ciq-chart'
						>
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
									<cq-chart-title cq-marker cq-browser-tab cq-activate-symbol-search-on-click></cq-chart-title>

									<cq-chart-legend></cq-chart-legend>
								</div>
							</div>
						</div>
					</div>
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

			<cq-side-panel></cq-side-panel>
		</>
	);
}
