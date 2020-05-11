import { getDefaultConfig } from '../chartiq/_config';

/**
 * Custom chart configuration and import plugins here
 * Multiple configuration sets can be created and exported
 */
export * from './resources';

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
	// config.menus = ['menuDisplay', 'menuPeriodicity', 'menuViews', 'menuStudies', 'menuEvents'];
	
	// show only few studies
	// config.menuStudies.includeOnly = ['ATR Bands', 'MACD', 'Moving Average'];
	return config;
}

export function getNoFooterConfig() {
	const config = getDefaultConfig();

	config.footer = null;
	return config;
}
