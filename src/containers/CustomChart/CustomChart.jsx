import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import { default as AdvancedChart, getCustomConfig } from "@chartiq/react-components/src/containers/AdvancedChart";

import "./CustomChart.css";
import { default as ShortcutDialog } from "./ShortcutDialog/ShortcutDialog";
import { default as RecentSymbols } from "./RecentSymbols/RecentSymbols";

/**
 * This is an example custom implementation of the AdvancedChart component with added React components.
 *
 * @export
 * @class CustomChart
 * @extends {React.Component}
 */
export default class CustomChart extends React.Component {
	constructor(props) {
		super(props);

		this.store = new CIQ.NameValueStore();
		this.symbolStorageName = "recentSymbols";
		this.shortcutStorageName = "customDrawingToolShortcuts";
		this.drawingToolsInfo = null;
		// Additional description for a drawing tool that will be injected into the shortcuts listing
		this.drawingToolDetails = {
			annotation: `
				Add text annotations to your chart.
			`,
			elliottwave: `
				The Elliott Wave Theory was developed by Ralph Nelson Elliott to describe...
			`
		};

		this.config = props.config || getCustomConfig(props);

		this.state = {
			chart: new CIQ.UI.Chart(),
			stx: null,
			uiContext: null,
			chartInitializedCallback: props.chartInitialized,
			shortcutDialog: false
		};
	}

	componentDidMount() {}

	componentWillUnmount() {
		// Destroy the ChartEngine instance when unloading the component.
		// This will stop internal processes such as quotefeed polling.
		const { stx } = this.state;
		stx.destroy();
		stx.draw = () => {};
	}

	postInit({ chartEngine, uiContext }) {
		if (this.props.chartIntialized) {
			this.props.chartIntialized({ chartEngine, uiContext });
		}

		this.updateCustomization(this.config).then(() => {
			this.addPreferencesHelper(uiContext);
			this.drawingToolsInfo = this.getDrawingTools(uiContext);
		});
		// portalizeContextDialogs(container);

		const self = this;
		const isForecasting = (symbol) => /_fcst$/.test(symbol);
		uiContext.stx.addEventListener(
			"symbolChange",
			({ symbol, symbolObject, action }) => {
				if (
					!isForecasting(symbol) &&
					(action === "master" || action === "add-series")
				) {
					self.updateSymbolStore(symbol, symbolObject);
				}
			}
		);

		this.setState({ stx: chartEngine, uiContext: uiContext });
	}

	// Update chart configuration with drawing tool shortcuts stored
	// in localStorage
	updateCustomization(config) {
		// currently only tool shortcuts are customized locally
		return this.getValue(this.shortcutStorageName).then((shortcuts) => {
			if (!shortcuts || !Object.keys(shortcuts).length) {
				return;
			}
			config.drawingTools.forEach((item) => {
				item.shortcut = shortcuts[item.tool] || "";
			});
		});
	}

	updateSymbolStore(symbol, { name = "", exchDisp = "" } = {}) {
		return this.getRecentSymbols().then((list) => {
			const count = ((list.symbol && list.symbol.count) || 0) + 1;
			list[symbol] = { symbol, name, exchDisp, count, last: +new Date() };
			return this.updateRecentSymbols(list);
		});
	}

	getRecentSymbols() {
		return this.getValue(this.symbolStorageName);
	}

	updateRecentSymbols(value) {
		return this.setValue(this.symbolStorageName, value);
	}

	// Get a value from localStorage
	getValue(name) {
		return new Promise((resolve, reject) => {
			this.store.get(name, (err, value) => {
				if (err) return reject(err);
				resolve(value || {});
			});
		});
	}
	// Set a value from localStorage
	setValue(name, value) {
		return new Promise((resolve, reject) => {
			this.store.set(name, value, (err) => {
				if (err) return reject(err);
				resolve(value);
			});
		});
	}

	// Injects a helper into the ChartIQ UI Layout object to invoke when
	// the custom added "Drawing Tools" item in the options menu is selected.
	addPreferencesHelper(uiContext) {
		const layoutHelper = uiContext.getAdvertised("Layout");

		layoutHelper.openPreferences = (node, type) => {
			this.setState({ shortcutDialog: true });
		};
	}

	// Retrieve an array of the drawing tools from the ChartIQ config object to
	// pass along to the custom ShortcutDialog component.
	getDrawingTools(uiContext) {
		const { drawingToolDetails: details } = this;

		let drawingTools = this.config.drawingTools.slice();
		return drawingTools.map(({ label, shortcut, tool }) => {
			return {
				label,
				tool,
				shortcut: shortcut || "",
				detail: details[tool]
			};
		});
	}

	// Store shortcut changed from the custom ShortcutDialog component in
	// localStorage
	setDrawingToolShortcuts(shortcuts) {
		const { topNode } = this.state.uiContext;

		this.config.drawingTools.forEach((item) => {
			item.shortcut = shortcuts[item.tool];
		});

		this.setValue(this.shortcutStorageName, shortcuts);

		rebuildDrawingPalette(topNode);
	}

	// Handler to pass along to the custom ShortcutDialog component that sets
	// its closed state
	closeDialog() {
		this.setState({ shortcutDialog: false });
	}

	// Return elements for chart plugin toggle buttons
	getPluginToggles() {
		const { tfc } = this.state.stx || {};
		return (
			<div className="trade-toggles ciq-toggles">
				{tfc && (
					<cq-toggle class="tfc-ui sidebar stx-trade" cq-member="tfc">
						<span></span>
						<cq-tooltip>Trade</cq-tooltip>
					</cq-toggle>
				)}
				<cq-toggle
					class="analystviews-ui stx-analystviews"
					cq-member="analystviews"
				>
					<span></span>
					<cq-tooltip>Analyst Views</cq-tooltip>
				</cq-toggle>
				<cq-toggle
					class="technicalinsights-ui stx-technicalinsights"
					cq-member="technicalinsights"
				>
					<span></span>
					<cq-tooltip>Technical Insights</cq-tooltip>
				</cq-toggle>
			</div>
		);
	}

	render() {
		const pluginToggles = this.getPluginToggles();

		let shortcutDialog = null;
		if (this.state.shortcutDialog)
			shortcutDialog = (
				<ShortcutDialog
					drawingToolsInfo={this.drawingToolsInfo}
					closeDialog={(event) => {
						this.closeDialog();
					}}
					setDrawingToolShortcuts={(shortcuts) => {
						this.setDrawingToolShortcuts(shortcuts);
					}}
				></ShortcutDialog>
			);

		return (
			<>
				<div className="info">
					<h2>Custom chart</h2>

					<div>
						...is a customization of the AdvancedChart template, featuring the
						addition of:
						<ul>
							<li>
								A native React component that enhances the ChartIQ symbol lookup
								web component by storing previously entered symbols and making
								them accessible in the lookup's RECENT tab.
								<br />
								<span className="instruction">
									Select Enter Symbol in the upper left corner of the chart or +
									Compare...
								</span>
							</li>
							<li>
								A dialog box implemented in React to add{" "}
								<a
									href="https://documentation.chartiq.com/tutorial-Navigation.html#drawing_palette_keyboard_shortcuts"
									target="shortcuts"
								>
									keystroke shortcuts
								</a>{" "}
								to the chart drawing tools and display information about the
								tools.
								<br />
								<span className="instruction">
									Select Drawing Tools from the Preferences (cog wheel) menu.
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="chartWrapper">
					<AdvancedChart
						config={this.config}
						chartInitialized={this.postInit.bind(this)}
						onChartReady={this.props.onChartReady}
					>
						<div className="ciq-nav full-screen-hide">
							<div className="sidenav-toggle ciq-toggles">
								<cq-toggle
									class="ciq-sidenav"
									cq-member="sidenav"
									cq-toggles="sidenavOn,sidenavOff"
									cq-toggle-classes="active,"
								>
									<span></span>
									<cq-tooltip>More</cq-tooltip>
								</cq-toggle>
							</div>

							<cq-menu class="ciq-search">
								<RecentSymbols getRecentSymbols={() => this.getRecentSymbols()}>
									<cq-lookup
										cq-keystroke-claim
										cq-uppercase
									></cq-lookup>
								</RecentSymbols>
							</cq-menu>

							<cq-side-nav cq-on="sidenavOn">
								<div className="icon-toggles ciq-toggles">
									<cq-toggle class="ciq-draw" cq-member="drawing">
										<cq-help help-id="drawing_tools_toggle"></cq-help>
										<span></span>
										<cq-tooltip>Draw</cq-tooltip>
									</cq-toggle>
									<cq-info-toggle-dropdown>
										<cq-toggle class="ciq-CH" cq-member="crosshair">
											<span></span>
											<cq-tooltip>Crosshair (Alt + \)</cq-tooltip>
										</cq-toggle>

										<cq-menu class="ciq-menu toggle-options collapse">
											<span></span>
											<cq-menu-dropdown>
												<cq-item cq-member="crosshair">
													Hide Heads-Up Display
													<span className="ciq-radio">
														<span></span>
													</span>
												</cq-item>
												<cq-item cq-member="headsUp-static">
													Show Heads-Up Display
													<span className="ciq-radio">
														<span></span>
													</span>
												</cq-item>
											</cq-menu-dropdown>
										</cq-menu>
									</cq-info-toggle-dropdown>

									<cq-info-toggle-dropdown>
										<cq-toggle class="ciq-HU" cq-member="headsUp">
											<span></span>
											<cq-tooltip>Info</cq-tooltip>
										</cq-toggle>

										<cq-menu class="ciq-menu toggle-options collapse tooltip-ui">
											<span></span>
											<cq-menu-dropdown>
												<cq-item cq-member="headsUp-dynamic">
													Show Dynamic Callout
													<span className="ciq-radio">
														<span></span>
													</span>
												</cq-item>
												<cq-item cq-member="headsUp-floating">
													Show Tooltip
													<span className="ciq-radio">
														<span></span>
													</span>
												</cq-item>
											</cq-menu-dropdown>
										</cq-menu>
									</cq-info-toggle-dropdown>

									<cq-toggle
										class="ciq-DT tableview-ui"
										cq-member="tableView"
									>
										<span></span>
										<cq-tooltip>Table View</cq-tooltip>
									</cq-toggle>
								</div>
							</cq-side-nav>

							<div className="ciq-menu-section">
								<div className="ciq-dropdowns">
									<cq-menu class="ciq-menu ciq-display collapse">
										<cq-clickable cq-tooltip-activator stxbind="Layout.chartType" ciq-no-icon-text="Display">
												<span ciq-menu-icon="true"></span>
												<cq-tooltip></cq-tooltip>
										</cq-clickable>
										<cq-menu-dropdown>
											<cq-menu-dropdown-section class="chart-types">
												<cq-heading>Chart Types</cq-heading>
												<cq-menu-container cq-name="menuChartStyle"></cq-menu-container>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="chart-aggregations">
												<cq-separator></cq-separator>
												<cq-heading>Aggregated Types</cq-heading>
												<cq-menu-container cq-name="menuChartAggregates"></cq-menu-container>
											</cq-menu-dropdown-section>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-menu class="ciq-menu ciq-period">
										<span>
											<cq-clickable stxbind="Layout.periodicity">
												1D
											</cq-clickable>
										</span>
										<cq-menu-dropdown>
											<cq-menu-container cq-name="menuPeriodicity"></cq-menu-container>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-menu class="ciq-menu ciq-views collapse">
										<span>Views</span>
										<cq-menu-dropdown>
											<cq-views></cq-views>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-menu
										class="ciq-menu ciq-studies collapse"
										cq-focus="input"
									>
										<span>Studies</span>
										<cq-menu-dropdown>
											<cq-study-legend cq-no-close>
												<cq-section-dynamic>
													<cq-heading>Current Studies</cq-heading>
													<cq-study-legend-content>
														<template cq-study-legend="true">
															<cq-item>
																<cq-label class="click-to-edit"></cq-label>
																<div className="ciq-icon ciq-close"></div>
															</cq-item>
														</template>
													</cq-study-legend-content>
													<cq-placeholder>
														<div
															stxtap="Layout.clearStudies()"
															className="ciq-btn sm"
															keyboard-selectable="true"
														>
															Clear All
														</div>
													</cq-placeholder>
												</cq-section-dynamic>
											</cq-study-legend>
											<div className="scriptiq-ui">
												<cq-heading>ScriptIQ</cq-heading>
												<cq-item>
													<cq-clickable
														cq-selector="cq-scriptiq-editor"
														cq-method="open"
													>
														New Script
													</cq-clickable>
												</cq-item>
												<cq-scriptiq-menu></cq-scriptiq-menu>
												<cq-separator></cq-separator>
											</div>
											<cq-heading cq-filter cq-filter-min="-1">
												Studies
											</cq-heading>
											<cq-studies></cq-studies>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-menu class="ciq-menu stx-markers collapse">
										<span>Events</span>
										<cq-menu-dropdown>
											<cq-heading>Chart Events</cq-heading>
											<cq-item stxtap="Markers.showMarkers('square')">
												Simple Square
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-item stxtap="Markers.showMarkers('circle')">
												Simple Circle
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-item stxtap="Markers.showMarkers('callout')">
												Callouts
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-item
												class="ta_markers-ui"
												stxtap="Markers.showMarkers('trade')"
											>
												Trade
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-item
												class="video_markers-ui"
												stxtap="Markers.showMarkers('video')"
											>
												Video
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-item stxtap="Markers.showMarkers('abstract')">
												Abstract
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<cq-separator></cq-separator>
											<cq-item
												stxtap="Markers.showMarkers()"
												class="ciq-active"
											>
												None
												<span className="ciq-radio">
													<span></span>
												</span>
											</cq-item>
											<div className="timespanevent-ui">
												<cq-separator></cq-separator>
												<cq-heading>Panel Events</cq-heading>
												<cq-item
													class="span-event"
													stxtap="TimeSpanEvent.showMarkers('Order')"
													cq-no-close
												>
													Order
													<span className="ciq-checkbox ciq-active">
														<span></span>
													</span>
												</cq-item>
												<cq-item
													class="span-event"
													stxtap="TimeSpanEvent.showMarkers('CEO')"
													cq-no-close
												>
													CEO
													<span className="ciq-checkbox ciq-active">
														<span></span>
													</span>
												</cq-item>
												<cq-item
													class="span-event"
													stxtap="TimeSpanEvent.showMarkers('News')"
													cq-no-close
												>
													News
													<span className="ciq-checkbox ciq-active">
														<span></span>
													</span>
												</cq-item>
											</div>
										</cq-menu-dropdown>
									</cq-menu>

									<cq-menu class="ciq-menu ciq-preferences collapse">
										<span></span>
										<cq-menu-dropdown>
											<cq-menu-dropdown-section class="chart-preferences">
												<cq-heading>Chart Preferences</cq-heading>
												<cq-menu-container cq-name="menuChartPreferences"></cq-menu-container>
												<cq-separator></cq-separator>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="y-axis-preferences">
												<cq-heading>Y-Axis Preferences</cq-heading>
												<cq-menu-container cq-name="menuYAxisPreferences"></cq-menu-container>
												<cq-separator></cq-separator>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="chart-addons">
												<cq-heading>Additional Features</cq-heading>
												<cq-menu-container cq-name="menuAddOns"></cq-menu-container>
												<cq-separator></cq-separator>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="chart-theme">
												<cq-heading>Themes</cq-heading>
												<cq-themes></cq-themes>
												<cq-separator></cq-separator>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="chart-locale">
												<cq-heading>Locale</cq-heading>
												<cq-item>
													<cq-clickable
														cq-selector="cq-timezone-dialog"
														cq-method="open"
													>
														Change Timezone
													</cq-clickable>
												</cq-item>
												<cq-item stxsetget="Layout.Language()">
													<cq-flag></cq-flag>
													<cq-language-name>Change Language</cq-language-name>
												</cq-item>
											</cq-menu-dropdown-section>
											<cq-menu-dropdown-section class="chart-preferences">
												<cq-separator></cq-separator>
												<cq-heading>Preferences</cq-heading>
												<cq-item stxtap="Layout.openPreferences('drawingTools')">
													Drawing Tools
												</cq-item>
											</cq-menu-dropdown-section>
										</cq-menu-dropdown>
									</cq-menu>
								</div>

								{pluginToggles}
							</div>
						</div>

						<cq-scriptiq class="scriptiq-ui"></cq-scriptiq>

						<cq-analystviews
							class="analystviews-ui"
							token="eZOrIVNU3KR1f0cf6PTUYg=="
							partner="1000"
							disabled
						></cq-analystviews>

						<cq-technicalinsights uid="" lang="en" disabled></cq-technicalinsights>

						<RecentSymbols
							connectCount="2"
							getRecentSymbols={() => this.getRecentSymbols()}
						>
							<div className="ciq-chart-area">
								<div className="ciq-chart">
									<cq-message-toaster
										defaultDisplayTime="10"
										defaultTransition="slide"
										defaultPosition="top"
									></cq-message-toaster>
									<cq-palette-dock>
										<div className="palette-dock-container">
											<cq-drawing-palette
												class="palette-drawing grid palette-hide"
												docked="true"
												orientation="vertical"
												min-height="300"
												cq-drawing-edit="none"
											></cq-drawing-palette>
											<cq-drawing-settings
												class="palette-settings"
												docked="true"
												hide="true"
												orientation="horizontal"
												min-height="40"
												cq-drawing-edit="none"
											></cq-drawing-settings>
										</div>
									</cq-palette-dock>

									<div className="chartContainer">
										<stx-hu-tooltip>
											<stx-hu-tooltip-field field="DT">
												<stx-hu-tooltip-field-name>
													Date/Time
												</stx-hu-tooltip-field-name>
												<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
											</stx-hu-tooltip-field>
											<stx-hu-tooltip-field field="Close">
												<stx-hu-tooltip-field-name></stx-hu-tooltip-field-name>
												<stx-hu-tooltip-field-value></stx-hu-tooltip-field-value>
											</stx-hu-tooltip-field>
										</stx-hu-tooltip>

										<cq-chart-title cq-marker cq-browser-tab></cq-chart-title>

										<cq-chartcontrol-group
											class="full-screen-show"
											cq-marker
										></cq-chartcontrol-group>

										<cq-comparison-lookup></cq-comparison-lookup>

										<cq-chart-legend></cq-chart-legend>

										<cq-loader></cq-loader>
									</div>
								</div>
							</div>
						</RecentSymbols>

						<cq-abstract-marker cq-type="helicopter"></cq-abstract-marker>

						<cq-attribution></cq-attribution>

						<div className="ciq-footer full-screen-hide">
							<cq-share-button></cq-share-button>
							<div
								className="shortcuts-ui ciq-shortcut-button"
								stxtap="Layout.showShortcuts()"
								title="Toggle shortcut legend"
							></div>
							<div className="help-ui ciq-help-button" stxtap="Layout.toggleHelp()" title="Toggle Interactive Help"></div>
							<cq-show-range></cq-show-range>
						</div>

						<div className="cq-context-dialog">
							<cq-dialog>
								<cq-drawing-context></cq-drawing-context>
							</cq-dialog>

							<cq-dialog>
								<cq-study-context></cq-study-context>
							</cq-dialog>
						</div>

						<cq-side-panel></cq-side-panel>

						{shortcutDialog}
					</AdvancedChart>
				</div>
			</>
		);
	}
}

/**
 * For applications that have more then one chart, keep single dialog of the same type
 * and move it outside context node to be shared by all chart components
 */
function portalizeContextDialogs(container) {
	container.querySelectorAll("cq-dialog").forEach((dialog) => {
		dialog.remove();
		if (!dialogPortalized(dialog)) {
			document.body.appendChild(dialog);
		}
	});
}

function dialogPortalized(el) {
	const tag = el.firstChild.nodeName.toLowerCase();
	return Array.from(document.querySelectorAll(tag)).some(
		(el) => !el.closest("cq-context")
	);
}

// Helper function that removes the existing drawing palette component and adds
// a new one.
function rebuildDrawingPalette(el) {
	const qs = (path) => el.querySelector(path);
	const container = qs(".palette-dock-container");
	const palette = qs("cq-drawing-palette");
	const newPalette = document.createElement("cq-drawing-palette");

	newPalette.className = palette.className;
	newPalette.setAttribute("docked", palette.getAttribute("docked"));
	newPalette.setAttribute("orientation", palette.getAttribute("orientation"));
	newPalette.setAttribute("min-height", palette.getAttribute("min-height"));
	const noOp = () => {};
	palette.keyStroke = palette.handleMessage = noOp;
	palette.remove();

	container.appendChild(newPalette);
}
