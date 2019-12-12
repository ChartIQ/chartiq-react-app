import { CIQ } from 'chartiq/js/componentUI';

import { quoteFeedSimulator } from 'chartiq/examples/feeds/quoteFeedSimulator';

const {
	Tooltip,
	UI: { KeystrokeHub }
} = CIQ;

/**
 * Chart setup web component `<chartiq-chart>`.
 * 
 * A formalized set of framework-independent reusable methods designed to initialize the different elements and configurations within a chart page.<br>
 * Things such as instantiating a chart engine, setting up a quote feed, loading up the UI, setting up market definitions, etc. are all managed here.<br>
 * 
 * This is used on our Frameworks applications, such  as our [React Application](https://github.com/ChartIQ/chartiq-react-app), 
 * in lieu of the script tags and standalone chart configuration functions you can see in our `sample-template-advanced.html` template. 
 * 
 * Please overwrite individual methods as needed to achieve your desired use case.
 *
 * @namespace WebComponents.chartiq-chart
 * @since 7.0.0
 * @example <caption>React example from WrappedChart.jsx to render the ChartIQ chart canvas and associated DOM elements</caption>
import React from 'react'
import { CIQ } from 'chartiq'
import { ChartIQChart } from 'components'
import TitleOverlay from '../Layout/TitleOverlay'
import ToolbarDrawing from '../Features/ToolbarDrawing'
import LoadingWidget from './LoadingWidget'
import HeadsUpStatic from '../Features/HeadsUpStatic'
import HeadsUpDynamic from '../Features/HeadsUpDynamic'
import MarkerAbstract from '../Features/MarkerAbstract'
import DataAttribution from '../Features/DataAttribution'
import { ChartContext } from '../../react-chart-context'

export default class WrappedChart extends React.Component {

	constructor (props) {
		super(props)

		this.createEngine = container => {
			var config = {container: container, chart: props.chartConstructor, preferences: props.preferences}
			this.stxx = container.stxx = new CIQ.ChartEngine(config)
			container.CIQ = CIQ
			container.$$$ = $$$
			let addOns = props.addOns
			container.startChart(this.stxx, this.feed, {refreshInterval: 1, bufferSize: 200}, addOns)
			this.context.setContext({stx: this.stxx})
		}

		this.engineRef = React.createRef()
		this.feed = this.props.quoteFeed || quoteFeedSimulator
	}

	componentDidMount() {
		this.createEngine(this.engineRef.current);
		window.addEventListener("resize", this.resizeScreen.bind(this));
		this.resizeScreen();
	}

	resizeScreen(){
		let containerWidth = document.querySelector('.cq-chart-container').offsetWidth;

		document.body.classList.remove('break-lg','break-md','break-sm')
		if (containerWidth> 700) {
			document.body.classList.add('break-lg');
		}
		else if (containerWidth <= 700 && containerWidth > 584) {
			document.body.classList.add('break-md');
		}
		else if (containerWidth <= 584) {
			document.body.classList.add('break-sm');
		}
	}

	render () {
		const Comparison = React.forwardRef((props, ref) => (
			ref.current && <ChartComparison forwardeRef={ref} />
		))

		return (
			<React.Fragment>
			<div className={"ciq-chart-area"}>
				<div className={"ciq-chart"}>
					{ this.context.stx && <ToolbarDrawing /> }
					<chartiq-chart class="chartContainer" defer-start="true" animations="false" ref={this.engineRef}>
						{ this.context.stx && <TitleOverlay refProp={this.engineRef} /> }
						<LoadingWidget />
						{this.props.dynamicHeadsUp && this.context.stx && <HeadsUpDynamic />
						}

						{this.props.staticHeadsUp && this.context.stx && <HeadsUpStatic />
						}
						<DataAttribution />
					</chartiq-chart>
					{ this.context.stx && <MarkerAbstract /> }
				</div>
			</div>
			</React.Fragment>
		)
	}
}

WrappedChart.contextType = ChartContext;
*/
class ChartIQChartContainer extends HTMLElement {
	get config() {
		return JSON.parse(this.getAttribute('chart-constructor'));
	}

	get defer() {
		return JSON.parse(this.getAttribute('defer-start'));
	}

	get drawingToolbar() {
		return JSON.parse(this.getAttribute('toolbar-active'));
	}

	constructor() {
		super();
	}

	connectedCallback() {
		if (this.defer) return;
		const config = Object.assign(
			{ container: document.querySelector('.chartContainer') },
			this.config
		);
		if (this.preferences) config.preferences = this.preferences;
		this.stx = new CIQ.ChartEngine(config);

		this.startChart();
	}

	disconnectedCallback() {
		this.stx.destroy();
	}

	/**
	 * Main method to start the charts addOns, plugins, etc.
	 * By default will be called on the connected callback unless defer-start attribute is set to true.
	 * Should be called by another function to start the chart.
	 *
	 * Expects a copy of the engine to be saved to this element.
	 * 
	 * @alias startChart
	 * @memberof WebComponents.chartiq-chart
	 * @since 7.0.0
	 * @example
	CIQ.UI.Container.prototype.startChart = function(engine, feed, behavior) {
		if (!this.stx) this.stx=engine;
		if (!this.stx) throw new Error('no CIQ.ChartEngine created!\nDouble check that you have passed an engine into this function.');
		this.configureDataSource(feed, behavior);
		this.configureMarkets();
		this.configureAddOns();
		this.startUI();
	}
	 */
	startChartUI(engine, feed, feedBehavior, addonOptions) {
		if (!this.stx) this.stx = engine;
		if (!this.stx)
			throw new Error(
				'no CIQ.ChartEngine created!\nDouble check that you have passed an engine into this function.'
			);
		this.configureDataSource(feed, feedBehavior);
		this.configureMarkets();
		this.configureAddOns(addonOptions);
		this.startUI();
	}

	/**
	 * Overwrite this method to extend and attach your own quoteFeed.
	 * This function should call CIQ.ChartEngine#attachQuoteFeed with the quoteFeed you wish to use or start streaming your data.
	 * 
	 * @alias configureDataSource
	 * @memberof WebComponents.chartiq-chart
	 * @since 7.0.0
	 * @example
	CIQ.UI.Container.prototype.configureDataSource = function(feed, behavior) {
		if (feed) this.stx.attachQuoteFeed(feed, behavior);
		else this.stx.attachQuoteFeed(quoteFeedSimulator, {refreshInterval: 1});
	}
	 */
	configureDataSource(feed, behavior) {
		const { stx } = this;
		if (feed) {
			stx.attachQuoteFeed(feed, behavior);
			return;
		}
		// attach default feed only if feed not set to null
		if (feed !== null) {
			stx.attachQuoteFeed(quoteFeedSimulator, { refreshInterval: 1 });
		}
	}

	/**
	 * Overwrite this method to extend and start your own custom chart UI here.
	 * Called by the connectedCallback so you are guaranteed to have access to the DOM. Initialize anything you need for your UI here.
	 * 
	 * @alias startUI
	 * @memberof WebComponents.chartiq-chart
	 * @since 7.0.0
	 * @example
	CIQ.UI.Container.prototype.startUI = function() {
		this.setHeight();
		this.startComponentUI();
	}
	 */
	startUI() {
		this.setHeight();
		this.startComponentUI();
	}

	/**
	 * Overwrite this method to set up your chart with custom market classes.
	 * 
	 * @alias configureMarkets
	 * @memberof WebComponents.chartiq-chart
	 * @since 7.0.0
	 * @example <caption>Default function</caption>
	CIQ.UI.ChartIQChart.prototype.configureMarkets = function() {
		this.stx.setMarketFactory(CIQ.Market.Symbology.factory);
	}
	 * @example <caption>React example (from main.js file) on how to set the chart to 24 hours mode by removing the this.stx.setMarketFactory call. </caption>	
import React from 'react'
import ReactDom from 'react-dom'
import { CIQ, $$$ } from 'chartiq'
// import { quoteFeedSimulator } from 'examples/feeds/quoteFeedSimulator'
import AdvancedChart from './containers/AdvancedChart'
let constructor = {}
let preferences = {labels:false, currentPriceLine:true, whitespace:0}
let enableAddOns = {InactivityTimer: {minutes:30}, ExtendedHours: {filter:true}, RangeSlider:true}

CIQ.UI.ChartIQChart.prototype.configureMarkets = function(){};
​
ReactDom.render(
React.createElement(AdvancedChart, {chartConstructor:constructor, preferences: preferences, addOns: enableAddOns}),
document.querySelector("#app")
)
	 */
	configureMarkets() {
		this.stx.setMarketFactory(CIQ.Market.Symbology.factory);
	}

	configureAddOns(addOns) {
		const { stx } = this;

		Object.entries(addOns)
			.filter(([, params]) => !!params)
			.forEach(([addOn, params]) => {
			const addOnObjectName = addOn[0].toUpperCase() + addOn.substr(1);

			try {
				if (!CIQ[addOnObjectName]) {
					if (CIQ.debug) {
						console.log('Plugin ' + addOnObjectName + ' not availble for ' + addOn + ' with params ', params)
					}
					return;
				}
				new CIQ[addOnObjectName]({ stx, ...(typeof params === 'object' ? params : {})})
			} catch (err) {
				if (CIQ.debug) {
					console.error('Error configuring ' + addOn + ' using params ', params, 'error', err);
				}
			}
		});
	}

	startComponentUI() {
		const { stx } = this;
		const UIContext = CIQ.UI.getMyContext(stx.container);
		if (!UIContext) {
			const contextContainer = findContextElement(this);
			if (!contextContainer) {
				throw new Error('Error: failed to find context container for ', this);
			}
			UIContext = new CIQ.UI.Context(stx, contextContainer);
		}
		UIContext.stx = this.stx;

		new CIQ.UI.StudyEdit(null, UIContext);
		// new CIQ.UI.DrawingEdit(null, UIContext);

		new KeystrokeHub(document.body, UIContext, {
			cb: KeystrokeHub.defaultHotKeys
		});

		if (UIContext.loader) UIContext.loader.show();
		if (CIQ.I18N.wordlists) CIQ.I18N.localize(stx, stx.preferences.language);

		this.restoreLayout(stx, function() {
			if (UIContext.loader) UIContext.loader.hide();
		});
		this.restorePreferences(stx);

		stx.addEventListener('layout', this.saveLayout);
		stx.addEventListener('symbolChange', this.saveLayout);
		stx.addEventListener('preferences', this.savePreferences);
		stx.addEventListener('newChart', this.retoggleEvents);
		stx.addEventListener('drawing', this.saveDrawings);

		function findContextElement(start) {
			const el = $('cq-context, [cq-context]', start).closest();
			if (el.length < 1) {
				return;
			}
			return el[0];
		}
	}

	restoreLayout(stx, cb) {
		var datum = CIQ.localStorage.getItem('myChartLayout');
		var self = this;
		function closure() {
			self.restoreDrawings(stx, stx.chart.symbol);
			if (cb) cb();
		}
		stx.importLayout(JSON.parse(datum), {
			managePeriodicity: true,
			cb: closure
		});
	}

	saveLayout(obj) {
		var s = JSON.stringify(obj.stx.exportLayout(true));
		CIQ.localStorageSetItem('myChartLayout', s);
	}

	restorePreferences(stx) {
		var pref = CIQ.localStorage.getItem('myChartPreferences');
		if (pref) stx.importPreferences(JSON.parse(pref));
	}

	savePreferences(obj) {
		CIQ.localStorageSetItem(
			'myChartPreferences',
			JSON.stringify(obj.stx.exportPreferences())
		);
	}

	retoggleEvents(obj) {
		var active = document.querySelector('.stx-markers .ciq-radio.ciq-active');
		if (active) CIQ.UI.BaseComponent.activate(active.parentElement);
	}

	saveDrawings(obj) {
		var tmp = obj.stx.exportDrawings();
		if (tmp.length === 0) {
			CIQ.localStorage.removeItem(obj.symbol);
		} else {
			CIQ.localStorageSetItem(obj.symbol, JSON.stringify(tmp));
		}
	}

	restoreDrawings(stx, symbol) {
		var memory = CIQ.localStorage.getItem(symbol);
		if (memory !== null) {
			var parsed = JSON.parse(memory);
			if (parsed) {
				stx.importDrawings(parsed);
				stx.draw();
			}
		}
	}

	showMarkers(type) {
		this.hideMarkers();
		this.createSampleEvents(type);
		this.stx.draw();
	}

	hideMarkers() {
		CIQ.Marker.removeByLabel(this.stx, 'circle');
		CIQ.Marker.removeByLabel(this.stx, 'square');
		CIQ.Marker.removeByLabel(this.stx, 'callout');
		CIQ.Marker.removeByLabel(this.stx, 'helicopter');
	}

	createSampleEvents(standardType) {
		let stx = this.stx;
		var l = stx.masterData.length;
		// An example of a data array to drive the marker creation
		var data = [];
		if (l >= 5)
			data.push({
				x: stx.masterData[l - 5].DT,
				type: standardType,
				category: 'news',
				headline: 'This is a Marker for a News Item'
			});
		if (l >= 15)
			data.push({
				x: stx.masterData[l - 15].DT,
				type: standardType,
				category: 'earningsUp',
				headline: 'This is a Marker for Earnings (+)'
			});
		if (l >= 25)
			data.push({
				x: stx.masterData[l - 25].DT,
				type: standardType,
				category: 'earningsDown',
				headline: 'This is a Marker for Earnings (-)'
			});
		if (l >= 35)
			data.push({
				x: stx.masterData[l - 35].DT,
				type: standardType,
				category: 'dividend',
				headline: 'This is a Marker for Dividends'
			});
		if (l >= 45)
			data.push({
				x: stx.masterData[l - 45].DT,
				type: standardType,
				category: 'filing',
				headline: 'This is a Marker for a Filing'
			});
		if (l >= 55)
			data.push({
				x: stx.masterData[l - 55].DT,
				type: standardType,
				category: 'split',
				headline: 'This is a Marker for a Split'
			});

		var story =
			'Like all ChartIQ markers, the object itself is managed by the chart, so when you scroll the chart the object moves with you. It is also destroyed automatically for you when the symbol is changed.';

		// Loop through the data and create markers
		for (var i = 0; i < data.length; i++) {
			var datum = data[i];
			datum.story = story;
			var params = {
				stx: stx,
				label: standardType,
				xPositioner: 'date',
				x: datum.x,
				//chartContainer: true, // Allow markers to float out of chart. Set css .stx-marker{ z-index:20}
				node: new CIQ.Marker.Simple(datum)
			};

			var marker = new CIQ.Marker(params);
		}
	}

	setHeight() {
		const {
			parentElement: { clientHeight: height }
		} = this;

		this.style.height = height + 'px';
		this.style.height = height - (this.drawingToolbar ? 45 : 0) + 'px';
	}
}

CIQ.UI.ChartIQChartContainer = ChartIQChartContainer;
customElements.define('chartiq-chart-container', ChartIQChartContainer);
