import React from "react";
import { CIQ } from "chartiq/js/componentUI";

import {
	ChartExample as Chart,
	getCustomConfig
} from "@chartiq/react-components/Chart";

import "./CustomChart.css";
import { default as ShortcutDialog } from "./ShortcutDialog/ShortcutDialog";

import getLicenseKey from "keyDir/key.js";
getLicenseKey(CIQ);

/**
 * This is an example custom implementation of the Chart component with added React components.
 *
 * @export
 * @class CustomChart
 * @extends {React.Component}
 */
export default class CustomChart extends React.Component {
	constructor(props) {
		super(props);

		this.store = new CIQ.NameValueStore();
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

		this.config = CIQ.extend(getCustomConfig(props), props.config || {});
		
		// Inject Drawing Tools menu item
		this.config.menus.preferences.content = [
			...this.config.menus.preferences.content,
			{ type: "separator" },
			{ type: 'heading', label: 'Preferences' },
			{
				type: 'item',
				label: 'Drawing Tools',
				tap: 'Layout.openPreferences',
				value: 'drawingTools'
			}
		];

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

	render() {
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
				<div className='custom-chart-info'>
					<h2>Custom chart</h2>

					<div>
						...is a customization of the Chart template, featuring the addition
						of:
						<ul>
							<li>
								A dialog box implemented in React to add{" "}
								<a
									href='https://documentation.chartiq.com/tutorial-Navigation.html#drawing_palette_keyboard_shortcuts'
									target='shortcuts'
								>
									keystroke shortcuts
								</a>{" "}
								to the chart drawing tools and display information about the
								tools.
								<br />
								<span className='instruction'>
									Select Drawing Tools from the Preferences (cog wheel) menu.
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className='chartWrapper'>
					<Chart
						config={this.config}
						chartInitialized={this.postInit.bind(this)}
						onChartReady={this.props.onChartReady}
					>
						<cq-chart-instructions role='contentinfo'></cq-chart-instructions>

						<div className='ciq-nav full-screen-hide' role='navigation'>
							<div className='sidenav-toggle ciq-toggles'>
								<cq-toggle class='ciq-sidenav' member='sidenav' toggles='sidenavOn,sidenavOff' toggle-classes='active,' reader='More Options' tooltip='More' icon='morenav'></cq-toggle>
							</div>

							<cq-toggle class='ciq-lookup-icon' config ='symbolsearch' reader='Symbol Search' tooltip='Symbol Search' icon='search' help-id='search_symbol_lookup'></cq-toggle>
							<cq-toggle class='ciq-comparison-icon' config ='symbolsearch' reader='Add Comparison' tooltip='Add Comparison' icon='compare' help-id='add_comparison' comparison='true'></cq-toggle>

							<cq-side-nav cq-on='sidenavOn'>
								<div className='icon-toggles ciq-toggles'>
									<cq-toggle class='ciq-draw' member='drawing' reader='Draw' tooltip='Draw' icon='draw' help-id='drawing_tools_toggle'></cq-toggle>
									<cq-toggle class='ciq-CH' config='crosshair' reader='Crosshair' tooltip='Crosshair (Alt + \)' icon='crosshair'></cq-toggle>
									<cq-menu class='nav-dropdown toggle-options' reader='Crosshair Options' config='crosshair'></cq-menu>
									<cq-toggle class='ciq-HU' feature='tooltip' config='info' reader='Info' tooltip='Info' icon='info'></cq-toggle>
									<cq-menu feature='tooltip' class='nav-dropdown toggle-options' reader='Info Options' config='info'></cq-menu>
									<cq-toggle class='ciq-DT' feature='tableview' member='tableView' reader='Table View' tooltip='Table View' icon='tableview'></cq-toggle>
								</div>
							</cq-side-nav>

							<div className='ciq-menu-section'>
								<div className='ciq-dropdowns'>
									<cq-menu class='nav-dropdown ciq-display' reader='Display' config='display' binding='Layout.chartType' icon help-id='display_dropdown' tooltip></cq-menu>
									<cq-menu class='nav-dropdown ciq-period' reader='Periodicity' config='period' text binding='Layout.periodicity'></cq-menu>
									<cq-menu class='nav-dropdown ciq-views alignright-md alignright-sm' config='views' text='Views' icon='views' responsive tooltip='Views'></cq-menu>
									<cq-menu class='nav-dropdown ciq-studies alignright' cq-focus='input' config='studies' text='Studies' icon='studies' responsive tooltip='Studies'></cq-menu>
									<cq-menu class='nav-dropdown ciq-markers alignright' config='markers' text='Events' icon='events' responsive tooltip='Events'></cq-menu>
									<cq-menu class='nav-dropdown ciq-preferences alignright' reader='Preferences' config='preferences' icon='preferences' tooltip='Preferences'></cq-menu>
								</div>

								<div className="ciq-toggles"></div>
							</div>

						</div>

						<div className='ciq-chart-area' role='main'>
							<div className='ciq-chart'>

								<cq-message-toaster
									default-display-time='10'
									default-transition='slide'
									default-position='top'
								></cq-message-toaster>

								<cq-palette-dock>
									<div className='palette-dock-container'>
										<cq-drawing-palette
											class='palette-drawing grid palette-hide'
											docked='true'
											orientation='vertical'
											min-height='300'
											cq-drawing-edit='none'
											cq-keystroke-claim
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
									<table className="hu-tooltip">
										<caption>Tooltip</caption>
										<tbody>
										<tr hu-tooltip-field="" className="hu-tooltip-sr-only">
											<th>Field</th>
											<th>Value</th>
										</tr>
										<tr hu-tooltip-field="DT">
											<td className="hu-tooltip-name">Date/Time</td>
											<td className="hu-tooltip-value"></td>
										</tr>
										<tr hu-tooltip-field="Close">
											<td className="hu-tooltip-name"></td>
											<td className="hu-tooltip-value"></td>
										</tr>
										</tbody>
									</table>

									<cq-chart-title cq-marker cq-browser-tab cq-activate-symbol-search-on-click></cq-chart-title>

									<cq-marker class="chart-control-group full-screen-show">
										<cq-toggle class="ciq-lookup-icon" config ="symbolsearch" reader="Symbol Search" tooltip="Symbol Search" icon="search" help-id="search_symbol_lookup"></cq-toggle>
										<cq-toggle class="ciq-comparison-icon" config ="symbolsearch" reader="Add Comparison" tooltip="Add Comparison" icon="compare" help-id="add_comparison" comparison="true"></cq-toggle>
										<cq-toggle class="ciq-draw" member="drawing" reader="Draw" icon="draw" tooltip="Draw" help-id="drawing_tools_toggle"></cq-toggle>
										<cq-toggle class="ciq-CH" config="crosshair" reader="Crosshair" icon="crosshair" tooltip="Crosshair (Alt + \)"></cq-toggle>
										<cq-toggle class="ciq-DT" feature="tableview" member="tableView" reader="Table View" icon="tableview" tooltip="Table View"></cq-toggle>
										<cq-menu class="nav-dropdown ciq-period full-screen" config="period" text binding="Layout.periodicity"></cq-menu>
									</cq-marker>
									
									<cq-study-legend class="hovershow" marker-label="Signals" filter="signal" cq-marker></cq-study-legend>
									<cq-study-legend class="hovershow" marker-label="Plots" clone-to-panel filter="panel" button-remove="true" series="true" cq-marker></cq-study-legend>

									<cq-loader></cq-loader>
								</div>
							</div>
						</div>

						<cq-abstract-marker cq-type='helicopter'></cq-abstract-marker>

						<cq-attribution></cq-attribution>

						<div role="complementary" className="ciq-footer full-screen-hide">
							<cq-share-button class="ciq-share-button bottom" reader="Share Chart" icon="share" tooltip="Share"></cq-share-button>
							<cq-toggle feature="shortcuts" member="session.shortcuts" class="ciq-shortcut-button bottom" stxtap="Layout.showShortcuts()" reader="Toggle Shortcut Legend" icon="shortcuts" tooltip="Shortcuts"></cq-toggle>
							<cq-toggle feature="help" member="session.help" class="ciq-help-button bottom" stxtap="Layout.toggleHelp()" reader="Toggle Interactive Help" icon="help" tooltip="Interactive Help"></cq-toggle>
							<cq-show-range config="range" role="group" aria-labelledby="label_showRange"></cq-show-range>
						</div>

						<cq-dialogs>
							<cq-dialog>
								<cq-drawing-context></cq-drawing-context>
							</cq-dialog>

							<cq-dialog>
								<cq-study-context></cq-study-context>
							</cq-dialog>
						</cq-dialogs>

						<cq-side-panel></cq-side-panel>

						{shortcutDialog}
					</Chart>
				</div>
			</>
		);
	}
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
