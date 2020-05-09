/**
 * Default configuration for the AdvancedChart component
 * 
 * The recommended way of using this configuration is by overriding
 * configuration object obtained from the getDefaultConfig function
 * Examples of extension and overrides ar provided in src/custom_chartiq_config folder
 */

import { CIQ } from 'chartiq/js/chartiq';
import { quoteFeedSimulator as quoteFeed } from 'chartiq/examples/feeds/quoteFeedSimulator';

export default getDefaultConfig();

export function getDefaultConfig() {
	return {
		// quote refresh interval
		quoteFeed,          // comment out or set to null to disable (quoteFeed: null)
		quoteFeedBehavior: {
			refreshInterval: 1, // defaults to 1 if not set. Referesh interval is required for MarketDepth simulation
			bufferSize: 200,
		},
		// Optionally set a market factory to the chart to make it market hours aware. Otherwise it will operate in 24x7 mode.
		// This is required for the simulator, or if you intend to also enable Extended hours trading zones.
		// Please note that, this method is set to use the CIQ.Market.Symbology functions by default,
		// which must be reviewed and adjust to comply with your quote feed and symbology format before they can be used.
		// Default implementation can be found in examples/markets/marketDefinitionsSample.js that by default is imported in resources.js file
		// Please review and override the functions in there to match the symbol format of your quotefeed or results will be unpredictable.
		marketFactory: CIQ.Market.Symbology.factory,
		
		// configuration passed to chart engine 
		chartConfig: {
			preferences: {
				labels: false, 
				currentPriceLine: true, 
				whitespace: 0
			}
		},
		header: true,                         // chart header will show / hide top navigation
		footer: true,                         // chart footer
		breakpoints: [584, 700],              // breakpoints define changes in layout
		breakpointSymbolPlaceholders: ['', 'Symbol', 'Enter Symbol'],
		headerLeft: {
			symbolLookup: true,
			toggles: ['drawing', 'crosshair', 'info']
		},
		defaultSymbol: 'AAPL',
		symbolLookupTabs: ['ALL', 'STOCKS', 'FX', 'INDEXES', 'FUNDS', 'FEATURES'],
		headsUpDisplayTypes: ['dynamic', 'static'],
		menus: ['menuPeriodicity', 'menuViews', 'menuDisplay', 'menuStudies', 'menuEvents'],
		menuPeriodicity: [
			{ label: '1 D', periodicity: 1, interval: 1, timeUnit: 'day' },
			{ label: '1 W', periodicity: 1, interval: 1, timeUnit: 'week' },
			{ label: '1 Mo', periodicity: 1, interval: 1, timeUnit: 'month' },
			{ type: 'separator' },
			{ label: '1 Min', periodicity: 1, interval: 1, timeUnit: 'minute' },
			{ label: '5 Min', periodicity: 1, interval: 5, timeUnit: 'minute' },
			{ label: '10 Min', periodicity: 1, interval: 10, timeUnit: 'minute' },
			{ label: '15 Min', periodicity: 3, interval: 5, timeUnit: 'minute' },
			{ label: '30 Min', periodicity: 1, interval: 30, timeUnit: 'minute' },
			{ label: '1 Hour', periodicity: 2, interval: 30, timeUnit: 'minute' },
			{ label: '4 Hour', periodicity: 8, interval: 30, timeUnit: 'minute' },
			{ type: 'separator' },
			{ label: '1 Sec', periodicity: 1, interval: 1, timeUnit: 'second' }
		],
		menuDisplay: [
			{ label: 'Chart Style', type: 'heading'},
			{ label: 'Candle', action: "Layout.ChartType('candle')", type: 'radio' },
			{ label: 'Bar', action: "Layout.ChartType('bar')", type: 'radio' },
			{ label: 'Colored Bar', action: "Layout.ChartType('colored_bar')", type: 'radio' },
			{ label: 'Line', action: "Layout.ChartType('line')", type: 'radio' },
			{ label: 'Hollow Candle', action: "Layout.ChartType('hollow_candle')", type: 'radio' },
			{ label: 'Mountain', action: "Layout.ChartType('mountain')", type: 'radio' },
			{ label: 'Baseline', action: "Layout.ChartType('baseline_delta')", type: 'radio' },
			{ label: 'Volume Candle', action: "Layout.ChartType('volume_candle')", type: 'radio' },
			{ type: 'separator'},
			{ label: 'Heikin Ashi', action: "Layout.ChartType('heikinashi')", type: 'radio' },
			{ label: 'Kagi', option: "Layout.showAggregationEdit('kagi')", action: "Layout.ChartType('kagi')", type: 'radio' },
			{ label: 'Line Break', action: "Layout.ChartType('linebreak')", option: "Layout.showAggregationEdit('linebreak')", type: 'radio' },
			{ label: 'Renko', action: "Layout.ChartType('renko')", option: "Layout.showAggregationEdit('renko')", type: 'radio' },
			{ label: 'Range Bars', action: "Layout.ChartType('rangebars')", option: "Layout.showAggregationEdit('rangebars')", type: 'radio' },
			{ label: 'Point & Figure', action: "Layout.ChartType('pandf')", option: "Layout.showAggregationEdit('pandf')", type: 'radio' },
			{ type: 'separator'},
			{ label: 'Chart Preferences', type: 'heading'},
			{ label: 'Log Scale', action: "Layout.ChartScale('log')", type: 'checkbox' },
			{ label: 'Invert Y-Axis', action: "Layout.FlippedChart()", type: 'checkbox' },
			{ label: 'Extended Hours', action: "Layout.ExtendedHours()", type: 'checkbox', required: 'ExtendedHours' },
			{ label: 'Range Selector', action: "Layout.RangeSlider()", type: 'checkbox', required: 'RangeSlider' },
			{ label: 'Hide Outliers', action: "Layout.Outliers()", type: 'checkbox', required: 'Outliers'  },
			// Layout.MarketDepth() binds and sets chart engine layout marketDepth propery that can be observed to initiat L2 data streaming
			{ label: 'Market Depth', action: "Layout.MarketDepth()", type: 'checkbox', required: 'cryptoiq' }, // absence of required resource will hide menu item until available
			// Layout.L2Heatmap() binds and sets chart engine layout l2heatmap propery that can be observed to initiat L2 data streaming
			{ label: 'L2 Heat Map', action: "Layout.L2Heatmap()", type: 'checkbox', required: 'cryptoiq' },
			{ type: 'separator'},
			{ label: 'Locale', type: 'heading'},
			{ label: 'Change Timezone', type: 'timezone'},
			{ label: 'Change Language', type: 'languages'},
			{ type: 'separator'},
			{ label: 'Themes', type: 'heading'},
			{ label: 'New Theme', type: 'themes'}
		],
		menuStudies: {
			includeOnly: [],   // add names to have as only included
			exclude: []         // exclude names from list of available studies
		},
		menuEvents: [
			{ label: 'Simple Square', markertype: 'square' },
			{ label: 'Simple Circle', markertype: 'circle' },
			{ label: 'Callouts', markertype: 'callout' },
			{ label: 'Trade', markertype: 'trade', required: 'showTradeAnalytics', load: ['chartiq/examples/markers/tradeAnalyticsSample', 'chartiq/examples/markers/tradeAnalyticsSample.css'] },
			{ label: 'Video', markertype: 'video', required: 'showVideoMarkers', load: ['chartiq/examples/markers/videoSample.js', 'chartiq/examples/markers/videoSample.css'] },
			{ label: 'Abstract', markertype: 'abstract' },
			{ type: 'separator'},
			{ label: 'None', markertype: 'none' }
		],
		footerShare: true,
		footerRange: [
			{ label: '1D', multiplier: 1, base: 'today', available: 'always' },
			{ label: '5D', multiplier: 5, base: 'day', interval: 30, period: 2, timeUnit: 'minute', available: 'always' },
			{ label: '1M', multiplier: 1, base: 'month', interval: 30, period: 8, timeUnit: 'minute', available: 'always' },
			{ label: '3M', multiplier: 3, base: 'month' },
			{ label: '6M', multiplier: 6, base: 'month' },
			{ label: 'YTD', multiplier: 1, base: 'YTD' },
			{ label: '1Y', multiplier: 1, base: 'year', available: 'always' },
			{ label: '5Y', multiplier: 5, base: 'year', interval: 1, period: 1, timeUnit: 'week'},
			{ label: 'All', multiplier: 1, base: 'all' }
		],
		drawingTools: [
			{ tool: 'annotation', group: 'text', label: 'Annotation', shortcut: 't' },
			{ tool: 'callout', group: 'text', label: 'Callout' },
			{ tool: 'average', group: 'statistics', label: 'Average Line' },
			{ tool: 'channel', group: 'lines', label: 'Channel' },
			{ tool: 'continuous', group: 'lines', label: 'Continuous' },
			{ tool: 'crossline', group: 'lines', label: 'Crossline' },
			{ tool: 'freeform', group: 'lines', label: 'Doodle' },
			{ tool: 'elliottwave', group: 'technicals', label: 'Elliott Wave'},
			{ tool: 'ellipse', group: 'markings', label: 'Ellipse', shortcut: 'e' },
			{ tool: 'retracement', group: 'fibonacci', label: 'Fib Retracement' },
			{ tool: 'fibprojection', group: 'fibonacci', label: 'Fib Projection' },
			{ tool: 'fibarc', group: 'fibonacci', label: 'Fib Arc' },
			{ tool: 'fibfan', group: 'fibonacci', label: 'Fib Fan' },
			{ tool: 'fibtimezone', group: 'fibonacci', label: 'Fib Time Zone' },
			{ tool: 'gannfan', group: 'technicals', label: 'Gann Fan' },
			{ tool: 'gartley', group: 'technicals', label: 'Gartley' },
			{ tool: 'horizontal', group: 'lines', label: 'Horizontal', shortcut: 'h' },
			{ tool: 'line', group: 'line', label: 'Line', shortcut: 'l' },
			{ tool: 'pitchfork', group: 'technicals', label: 'Pitchfork' },
			{ tool: 'quadrant', group: 'statistics', label: 'Quadrant Lines' },
			{ tool: 'ray', group: 'lines', label: 'Ray' },
			{ tool: 'rectangle', group: 'markings', label: 'Rectangle', shortcut: 'r' },
			{ tool: 'regression', group: 'statistics', label: 'Regression Line' },
			{ tool: 'segment', group: 'lines', label: 'Segment' },
			{ tool: 'arrow', group: 'markings', label: 'Arrow', shortcut: 'a' },
			{ tool: 'check', group: 'markings', label: 'Check' },
			{ tool: 'xcross', group: 'markings', label: 'Cross' },
			{ tool: 'focusarrow', group: 'markings', label: 'Focus' },
			{ tool: 'heart', group: 'markings', label: 'Heart' },
			{ tool: 'star', group: 'markings', label: 'Star' },
			{ tool: 'speedarc', group: 'technicals', label: 'Speed Resistance Arc' },
			{ tool: 'speedline', group: 'technicals', label: 'Speed Resistance Line' },
			{ tool: 'timecycle', group: 'technicals', label: 'Time Cycle' },
			{ tool: 'tirone', group: 'statistics', label: 'Tirone Levels' },
			{ tool: 'trendline', group: 'text', label: 'Trend Line' },
			{ tool: 'vertical', group: 'lines', label: 'Vertical', shortcut: 'v' }
		],
		drawingToolGrouping: ['All', 'Favorites', 'Text', 'Statistics', 'Technicals', 'Fibonacci', 'Markings', 'Lines'],
		drawingFontSizes: [8, 10, 12, 13, 14, 16, 18, 20, 28, 36, 48, 64],
		drawingFonts: [
			'Default',
			'Helvetica',
			'Courier',
			'Garamond',
			'Palatino',
			'Times New Roman'
		],
		chartControlGroup: ['chart_lookup', 'toggle_drawing', 'toggle_crosshair', 'menu_periodicity'],
		// addOns will be initiated with chart engine and following parameters
		// using capitalized property such as: extendedHours -> CIQ.ExtendedHours(...)
		addOns: {  
			inactivityTimer: { minutes: 30 },
			extendedHours: { filter: true },
			rangeSlider: { },
			animation: { tension: 0.3 },
			continuousZoom: {
				periodicities:
				[
					// daily interval data
					{ period: 1, interval: 'month' },
					{ period: 1, interval: 'week' },
					{ period: 1, interval: 'day' },
					// 30 minute interval data
					{ period: 8, interval: 30 },
					{ period: 1, interval: 30 },
					// 1 minute interval data
					{ period: 5, interval: 1 },
					{ period: 1, interval: 1 },
					// one second interval data
					{ period: 10, interval: 1, timeUnit: 'second' },
					{ period: 1,  interval:1,  timeUnit: 'second' },
				],
				boundaries:{
					maxCandleWidth: 15,
					minCandleWidth: 3
				}
			},
			tooltip: {
				ohl: true,
				volume: true,
				series: true,
				studies: true
			},
			fullScreen: { },
			outliers: { }
		},
		/**
		 * Not all plugins may be available, import required plugins to make 
		 * them available in addition to configuration here
		 */
		plugins: {
			tfc: true,
			scriptIQ: true,
			timeSpanEvents: true, // available starting 7.3
			cryptoiq: {
				marketDepth: {
					volume: true,
					mountain: true,
					step: true,
					record: true,
					height: '50%',
					// if preceding container is found, market depth panel will be created after that element
					// or will default to element with .market-depth-bookmark selector
					// if selector element is not found market depth panel will not be created
					precedingContainer: '.market-depth-bookmark', // default
				},
				orderBook: {
					addToChart: true,
					closeButton: true,
					price: true,
					size: true,
					totalSize: true,
					amount: true,
					totalAmount: true,
				},
				// override or delete in customization simulateL2 function to prevent L2 simulation
				// when not in the simulation mode stx layout marketDepth and l2heatmap properties can be
				// observed to start and stop L2 data addition
				simulateL2(stx) {
					if (!CIQ.simulateL2) {
						console.error('Error: L2 simulation not availabe');
						return;
					}
					CIQ.simulateL2({ stx, onTrade: true });
				},
			}
		}
	}
}
