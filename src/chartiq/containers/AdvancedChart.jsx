import React from 'react';
import { CIQ } from 'chartiq';

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
import MarketDepth from '../components/Plugins/CryptoIQ/MarketDepth';

import { ChartContext } from '../context/ChartContext';
import { getDefaultConfig } from '../_config';

/**
 * This is a fully functional example showing how to load a chart with complete user interface.
 *
 * Customize this sample template as needed to meet your use case and fit the screen size of your supported devices.
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

		this.updateContainerSize = this.updateContainerSize.bind(this);
		this.resizeScreen = this.resizeScreen.bind(this);

		this.setContext = update => {
			this.setState(update);
			return update;
		};

		const self = this;
		const { chartInitialized } = this.props;
		this.state = {
			config: this.props.config || getDefaultConfig(),
			stx: null,
			UIContext: null,
			components: { AdvancedChart: this },
			setContext: this.setContext,
			registerComponent: component => {
				this.setState({ ...this.components, component });
				return component;
			},
			resize: () => {
				this.resizeScreen();
			},
			setChartEngine: stx => {
				// set event listners on layout
				this.configurePlugins(stx);
				this.setState({ stx });
				stx.addEventListener('layout', self.resizeScreen);
				if (chartInitialized) {
					chartInitialized({ chartEngine: stx, uiContext: self.state.UIContext });
				}
			}
		};
	}

	componentDidMount() {
		addUIManager();
		const contexContainerElement = this.chartContextEl.current;
		// the first parameter chart engine element will be attached in WrappedChart mount
		const UIContext = new CIQ.UI.Context(null, contexContainerElement);

		// create layout helper class
		const UILayout = new CIQ.UI.Layout(UIContext);

		this.setState({ UIContext, UILayout });

		CIQ.UI.observeProperty('uiLayout', UIContext, this.resizeScreen);

		this.resizeScreen = this.resizeScreen.bind(this);
		window.addEventListener('resize', this.updateContainerSize);
		this.updateContainerSize();

		// init binding in webcomponents
		setTimeout(() => CIQ.UI.begin(), 100);

		function addUIManager() {
			// chart ui requires cq-ui-manger singleton in document
			if (!document.querySelector('cq-ui-manager')) {
				document.body.appendChild(document.createElement('cq-ui-manager'));
			}
		}
	}

	configurePlugins(stx) {
		const { plugins, marketDepth, simulateL2 } = this.props.config;
		const { UIContext } = this.state;
		if (!plugins) return;

		if (plugins.cryptoiq) {
			new CIQ.MarketDepth({
				stx,
				...marketDepth,
				...plugins.cryptoiq.marketDepth
			});
			simulateL2(stx);
		}
		if (plugins.tfc && CIQ.TFC) {
			new CIQ.TFC({
				stx,
				account: plugins.tfc.account,
				context: this.context.UIContext
			});
		}

		if(plugins.timeSpanEvents && CIQ.TimeSpanEventPanel) {
			new CIQ.TimeSpanEventPanel({stx: stx, context: UIContext});
			let helper = new CIQ.UI.TimeSpanEvent(UIContext, {menuItemSelector: ".stx-markers cq-item.span-event"});
			helper.implementation = new CIQ.TimeSpanEventSample(stx);
		}
	}

	/**
	 * update for container size changes
	 */
	updateContainerSize() {
		if (!this.chartContainer.current) {
			setTimeout(this.updateContainerSize, 10);
			return;
		}
		const {
			clientWidth: width,
			clientHeight: containerHeight
		} = this.chartContainer.current;

		const { UIContext } = this.state;
		const { 
			breakpoints: size, 
			breakpointLabels: label, 
			breakpointSymbolPlaceholders: symbolPlaceholders 
		} = this.props.config;

		const breakpointSize = width < size[0] 
			? label[0] 
			: (width < size[1] ? label[1] : label[2]);

		const symbolPlaceholder =  width < size[0] 
			? symbolPlaceholders[0] 
			: (width < size[1] ? symbolPlaceholders[1] : symbolPlaceholders[2]);

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
			uiLayout: { breakpointSize },
			SidePanel,
			PaletteDock
		} = UIContext;

		// sidenav is set only for small screen size
		const sidenavAvailable = breakpointSize === 'sm';
		if (!sidenavAvailable) {
			stx.layout.sidenav = 'sidenavOff';
		}

		// adjust for side nav and side panel (tfc)
		const chartAreaLeft = stx.layout.sidenav === 'sidenavOn' ? 40 : 0;
		const chartAreaRight = SidePanel && SidePanel.nonAnimatedWidth() || 0;

		this.setState(
			state => ({
				breakpointSize,
				sidenavAvailable,
				chartAreaLeft,
				chartAreaRight,
			}),
			() => {
				PaletteDock.handleResize();
				stx.resizeChart();
			}
		);
	}

	render() {
		// more explicit props wiring to WrappedChart and ChartNav
		const { 
			header,
			footer,
			chartConfig,
			addOns,
			quoteFeed,
			refreshInterval,
			bufferSize,
			headsUpDisplayTypes,
			plugins 
		} = this.props.config;
		const { UIContext, breakpointSize, chartAreaLeft, chartAreaRight } = this.state;
		const breakpointClass = `cq-chart-container break-${breakpointSize}`;

		return (
			<ChartContext.Provider value={this.state}>
				<div cq-context="true" ref={this.chartContextEl}>
					{UIContext && (
						<>
							<div className={breakpointClass} ref={this.chartContainer}>
								<ColorPicker />
								{header && <ChartNav plugins={plugins} />}
								{plugins && this.state.stx && <Plugins {...plugins} />}
								<ChartArea 
									{ ... {header, footer, left: chartAreaLeft, right: chartAreaRight}}>
									<WrappedChart 
										{...{
											chartConfig,
											addOns,
											quoteFeed,
											refreshInterval,
											bufferSize,
											headsUpDisplayTypes
										}} />
									<MarketDepth plugins={plugins} />
								</ChartArea>
								<BottomPanel>
									{plugins.scriptIQ && <ScriptIQ />}
								</BottomPanel>
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
