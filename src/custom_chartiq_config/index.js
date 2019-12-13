/**
 * Custom chart configuration and import plugins here
 * Multiple configuration sets can be created and exported
 */
export * from './plugins';

import { getDefaultConfig } from '../chartiq/_config';

export default getConfiguration();

export function getConfiguration() {
	const config = getDefaultConfig();
	
	// update chart configuration by modifying default configuration
	config.chartConfig.preferences.currentPriceLine = true;
	config.addOns.tooltip = null;
	
	// select and order symbol market tabs
	config.symbolLookupTabs = ['ALL', 'FX', 'STOCKS'];
	
	// uncomment following to have minimal interace
	// config.header = null
	// config.footer = null;
	
	// turning off individual menus or re-ordering
	// config.menus = ['menu_display', 'menu_periodicity', 'menu_views', 'menu_studies', 'menu_events'];
	
	// show only few studies
	// config.menu_studies.include_only = ['ATR Bands', 'MACD', 'Moving Average'];
	return config;
}

export function getNoFooterConfig() {
	const config = getDefaultConfig();

	config.footer = null;
	return config;
}

