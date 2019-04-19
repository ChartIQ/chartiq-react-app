import React from 'react'
import { Clickable, Lookup, Menu, MenuDropDown, Scroll, Themes } from 'components'
import { ChartContext } from '../../react-chart-context'

export default class MenuSettings extends React.Component {
	
	componentDidMount () {
		let themes = $$$('cq-themes')
		let themeParams = {
		builtInThemes: {"ciq-day":"Day","ciq-night":"Night"},
		defaultTheme: "ciq-night",
		// nameValueStore: UIStorage
	}
		themes.initialize(themeParams)
	}

	render () {
		return (
<cq-menu class="ciq-menu ciq-display collapse">
				<span>Display</span>
				<cq-menu-dropdown>
					<cq-heading>Chart Style</cq-heading>
					<cq-item stxsetget="Layout.ChartType('candle')">Candle<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('bar')">Bar<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('colored_bar')">Colored Bar<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('line')">Line<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('hollow_candle')">Hollow Candle<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('mountain')">Mountain<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('baseline_delta')">Baseline<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ChartType('volume_candle')">Volume Candle<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-separator></cq-separator>
					<cq-item>
						<div stxsetget="Layout.ChartType('heikinashi')">Heikin Ashi<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-item>
						<span className="ciq-edit" stxtap="Layout.showAggregationEdit('kagi')"></span>
						<div stxsetget="Layout.ChartType('kagi')">Kagi<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-item>
						<span className="ciq-edit" stxtap="Layout.showAggregationEdit('linebreak')"></span>
						<div stxsetget="Layout.ChartType('linebreak')">Line Break<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-item>
						<span className="ciq-edit" stxtap="Layout.showAggregationEdit('renko')"></span>
						<div stxsetget="Layout.ChartType('renko')">Renko<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-item>
						<span className="ciq-edit" stxtap="Layout.showAggregationEdit('rangebars')"></span>
						<div stxsetget="Layout.ChartType('rangebars')">Range Bars<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-item>
						<span className="ciq-edit" stxtap="Layout.showAggregationEdit('pandf')"></span>
						<div stxsetget="Layout.ChartType('pandf')">Point & Figure<span className="ciq-radio"><span></span></span>
						</div>
					</cq-item>
					<cq-separator></cq-separator>
					<cq-heading>Chart Preferences</cq-heading>
					<cq-item stxsetget="Layout.ChartScale('log')">Log Scale<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.FlippedChart()">Invert Y-Axis<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.ExtendedHours()">Extended Hours<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>
					<cq-item stxsetget="Layout.RangeSlider()">Range Selector<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>
					{/*<!-- Uncomment this option for access to cryptoIQ Marketdepth/Orderbook functionality -->
					<!--<cq-item stxsetget="Layout.MarketDepth()">Market Depth<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>-->*/}
					<cq-separator></cq-separator>
					<cq-heading>Locale</cq-heading>
						<cq-item><cq-clickable cq-selector="cq-timezone-dialog" cq-method="open">Change Timezone</cq-clickable></cq-item>
						<cq-item stxsetget="Layout.Language()"><cq-flag></cq-flag><cq-language-name>Change Language</cq-language-name></cq-item>
					<cq-separator></cq-separator>
					<cq-heading>Themes</cq-heading>
					<cq-themes>
						<cq-themes-builtin cq-no-close>
							<template>
								<cq-item></cq-item>
							</template>
						</cq-themes-builtin>
						<cq-themes-custom cq-no-close>
							<template>
								<cq-theme-custom>
									<cq-item>
										<cq-label></cq-label>
										<cq-close></cq-close>
									</cq-item>
								</cq-theme-custom>
							</template>
						</cq-themes-custom>
						<cq-separator cq-partial></cq-separator>
						<cq-item stxtap="newTheme()"><cq-plus></cq-plus>New Theme</cq-item>
					</cq-themes>
				</cq-menu-dropdown>
			</cq-menu>
		)
	}
}
