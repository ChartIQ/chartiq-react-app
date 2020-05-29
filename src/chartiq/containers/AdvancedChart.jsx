import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';

import {
	ChartNav,
	ChartArea,
	SidePanel,
	BottomPanel,
	ChartFooter
} from '../components/Layout';

import { WrappedChart, Plugins } from '../components/Core';
import ColorPicker from '../components/Features/ColorPicker';
import ChartDialogs from '../components/Dialogs/ChartDialogs';
import ScriptIQ from '../components/Plugins/ScriptIQ/ScriptIQ';
import MarketDepthBookmark from '../components/Plugins/CryptoIQ/MarketDepthBookmark';

import { ChartContext } from '../context/ChartContext';
import { getDefaultConfig } from '../_config';

// shortcut to chartiq provided property observer
const { observeProperty } = CIQ.UI;

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * @export
 * @class AdvancedChart
 * @extends {React.Component}
 */
export default class AdvancedChart extends React.Component {
	constructor(props) {
		super(props);

		this.chartContainer = React.createRef();
		this.chartContextEl = React.createRef();

		this.afterChartIntitalized = this.afterChartIntitalized.bind(this);
		this.updateContainerSize = this.updateContainerSize.bind(this);
		this.resizeScreen = this.resizeScreen.bind(this);

		this.state = {
			stx: null,
			UIContext: null,
			config: this.props.config || getDefaultConfig(),
			setContext: update => this.setState(update),
			components: {},
			registerComponent: component =>
				this.setState({ components: { ...this.components, component } }),
			resize: () => this.resizeScreen(),
			setChartEngine: stx => {
				this.setState(() => ({ stx }), this.afterChartIntitalized);
			},
			updateChartSize: this.updateChartSize
		};
	}

	afterChartIntitalized() {
		const { stx, UIContext } = this.state;
		const { chartInitialized, pluginsToLoadLazy = {} } = this.props;
		const self = this;

		initListeners();
		this.configureLoadedPlugins();

		const msToWaitToLoadPlugins = 100;
		setTimeout(loadPlugins, msToWaitToLoadPlugins);

		// initiate chartiq element binding
		CIQ.UI.begin();

		// notify component container that chart is initialized
		if (chartInitialized) {
			chartInitialized({ chartEngine: stx, uiContext: this.state.UIContext });
		}

		function initListeners() {
			window.addEventListener('resize', self.updateContainerSize);
			self.updateContainerSize();
			stx.addEventListener('layout', self.resizeScreen);
			observeProperty('uiLayout', UIContext, self.resizeScreen);
		}

		function loadPlugins() {
			Object.entries(pluginsToLoadLazy).forEach(([name, loadFunction]) => {
				if (CIQ.debug) console.log('loading ' + name);
				loadFunction()
					.then(() => {
						if (CIQ.debug) console.log('plugin ' + name + ' loaded');
						self.configureLoadedPlugins();
					})
					.catch((e) => {
						if (CIQ.debug) console.warn('failed to load plugin ' + name);
					}) ;
			});
		}
	}

	componentDidMount() {
		addUIManager();

		const contexContainer = this.chartContextEl.current;

		// the first parameter, currently set to null chart engine element, will be attached in WrappedChart mount
		const UIContext = new CIQ.UI.Context(null, contexContainer);

		// create layout helper class
		const UILayout = new CIQ.UI.Layout(UIContext);

		this.setState({ UIContext, UILayout });

		function addUIManager() {
			// chart ui requires cq-ui-manger singleton in document
			if (!document.querySelector('cq-ui-manager')) {
				document.body.appendChild(document.createElement('cq-ui-manager'));
			}
		}
	}

	/**
	 * Initiate plugins
	 * It is invoked on startup and once for every lazy loaded plugin
	 * requiring to keep track of loaded plugins
	 * @param {CIQ.ChartEngine} stx
	 */
	configureLoadedPlugins() {
		const { 
			stx,
			UIContext,
			pluginsInstalled = {},
			config: { plugins, marketDepth }
		} = this.state;
		if (!plugins) return;

		// this function is invoked every time a plugin resource is loaded so check if plugin is already installed
		if (plugins.cryptoiq && CIQ.MarketDepth && !pluginsInstalled.cryptoiq) {
			new CIQ.MarketDepth({
				stx,
				...marketDepth,
				...plugins.cryptoiq.marketDepth
			});
			if (plugins.cryptoiq.simulateL2) {
				plugins.cryptoiq.simulateL2(stx);
			}
			pluginsInstalled.cryptoiq = true;
		}
		if (plugins.tfc && CIQ.TFC && !pluginsInstalled.tfc) {
			new CIQ.TFC({
				stx,
				account: plugins.tfc.account,
				context: UIContext
			});
			pluginsInstalled.tfc = true;
		}

		if (
			plugins.timeSpanEvents &&
			CIQ.TimeSpanEventPanel &&
			!pluginsInstalled.timeSpanEvents
		) {
			new CIQ.TimeSpanEventPanel({ stx: stx, context: UIContext });
			const helper = new CIQ.UI.TimeSpanEvent(UIContext, {
				menuItemSelector: '.stx-markers cq-item.span-event'
			});
			helper.implementation = new CIQ.TimeSpanEventSample(stx);
			pluginsInstalled.timeSpanEvents = true;
		}

		this.setState({ pluginsInstalled: { ...pluginsInstalled } });
		stx.changeOccurred('layout');
	}

	/**
	 * update for container size changes
	 */
	updateContainerSize() {
		const chartContainer = this.chartContainer.current;

		if (!chartContainer) {
			// chartContainer will not be rendered on the first invocation as
			// context (cq-context element) needs to be available first
			// wait until it is available and try again
			setTimeout(this.updateContainerSize, 10);
			return;
		}

		const {
			clientWidth: width,
			clientHeight: containerHeight
		} = chartContainer;
		const { UIContext } = this.state;
		const {
			breakpoints: size,
			breakpointSymbolPlaceholders: symbolPlaceholders
		} = this.state.config;

		const labels = ['sm', 'md', 'lg']; // ui container class suffixes for various break points
		const breakpointSize =
			width < size[0] ? labels[0] : width < size[1] ? labels[1] : labels[2];

		const symbolPlaceholder =
			width < size[0]
				? symbolPlaceholders[0]
				: width < size[1]
				? symbolPlaceholders[1]
				: symbolPlaceholders[2];

		UIContext.uiLayout = {
			...UIContext.uiLayout,
			breakpointSize,
			containerWidth: width,
			containerHeight,
			symbolPlaceholder
		};

		this.resizeScreen();
	}

	/**
	 * updates screen layout based on component configuration changes
	 */
	resizeScreen() {
		const { chartArea, UIContext, stx } = this.state;
		if (!chartArea || !UIContext) {
			return;
		}

		const {
			PaletteDock,
			uiLayout: { 
				breakpointSize,
				sidepanelWidth: chartAreaRight = 0
			}
		} = UIContext;

		// sidenav is set only for small screen size
		const sidenavAvailable = breakpointSize === 'sm';
		if (!sidenavAvailable) {
			stx.layout.sidenav = 'sidenavOff';
		}

		// adjust for side nav and side panel (tfc)
		const chartAreaLeft = stx.layout.sidenav === 'sidenavOn' ? 40 : 0;
		this.setState(
			state => ({
				breakpointSize,
				sidenavAvailable,
				chartAreaLeft,
				chartAreaRight
			}),
			() => {
				PaletteDock.handleResize();
				stx.resizeChart();
			}
		);
	}

	render() {
		const {
			config,
			config: {
				// where possible provide explicitly specific config properties
				header,
				footer,
				chartConfig,
				addOns,
				quoteFeed,
				quoteFeedBehavior,
				marketFactory,
				headsUpDisplayTypes,
				plugins = {},
			},
			stx,
			UIContext,
			breakpointSize,
			chartAreaLeft,
			chartAreaRight,
		} = this.state;

		const breakpointClass = `cq-chart-container break-${breakpointSize}`;

		return (
			<ChartContext.Provider value={this.state}>
				<div cq-context="true" ref={this.chartContextEl}>
					{UIContext && (
						<>
							<div className={breakpointClass} ref={this.chartContainer}>
								<ColorPicker />
								{header && <ChartNav config={config} />}
								{plugins.cryptoiq && stx && (
									<Plugins cryptoiq={plugins.cryptoiq} />
								)}
								<ChartArea
									{...{
										header,
										footer,
										left: chartAreaLeft,
										right: chartAreaRight
									}}
								>
									<WrappedChart
										{...{
											chartConfig,
											addOns,
											quoteFeed,
											quoteFeedBehavior,
											marketFactory,
											headsUpDisplayTypes
										}}
									/>
									<MarketDepthBookmark />
								</ChartArea>
								<BottomPanel>{plugins.scriptIQ && <ScriptIQ />}</BottomPanel>
								<SidePanel />
								<ChartDialogs />
								{footer && <ChartFooter />}
							</div>
						</>
					)}
				</div>
			</ChartContext.Provider>
		);
	}
}
AdvancedChart.contextType = ChartContext;
