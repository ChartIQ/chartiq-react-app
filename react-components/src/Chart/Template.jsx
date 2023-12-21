import { CIQ } from "chartiq";
import React from "react";

export default function ({ config, pluginToggles }) {
	return (
		<>
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
		</>
	);
}
