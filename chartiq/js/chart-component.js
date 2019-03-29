/* removeIf(umd) */
//-------------------------------------------------------------------------------------------
// Copyright 2012-2019 by ChartIQ, Inc.
// All rights reserved
//-------------------------------------------------------------------------------------------
;(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['componentUI'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('componentUI'));
	} else {
		factory(root);
	}
})(this, function(_exports) {
var CIQ = _exports.CIQ;
var $$$ = _exports.$$$;
/* endRemoveIf(umd) */

class ChartIQChart extends HTMLElement {
	static get observedAttributes() {
		return ["chart-constructor", "chart-layout", "chart-preferences", "defer-start"];
	}

	get config() {
		return JSON.parse(this.getAttribute('chart-constructor'));
	}

	get preferences() {
		return JSON.parse(this.getAttribute('chart-preferences'));
	}

	set preferences(preferences) {
		this.setAttribute('chart-preferences', JSON.stringify(preferences));
	}

	get defer() {
		return JSON.parse(this.getAttribute("defer-start"));
	}

	get drawingToolbar() {
		return JSON.parse(this.getAttribute('toolbar-active'));
	}

	constructor () {
		super();
		console.log('chartiq-chart web component constructor');
	}

	connectedCallback(args) {
		if (this.defer) return;
		let config = Object.assign({container: document.querySelector(".chartContainer")}, this.config);
		if(this.preferences) config.preferences=this.preferences;
		this.stxx = new CIQ.ChartEngine(config);

		console.log('connectedCallback chartiq-chart');
		this.startChart();
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		// Return on if we haven't initiated the chart yet
		if(!this.stxx) return;

		if (attr==='chart-layout') {
			console.log(`OLD: ${oldValue}`);
			console.log(`NEW: ${newValue}`);
			this.stxx.layout=JSON.parse(newValue);
			this.stxx.dispatch('layout', {stx:this.stxx});
		}
		if (attr==='chart-preferences') {

		}
	}

	/**
	 * Main method to start the charts addOns, plugins, etc.
	 * By default will be called on the connected callback unless defer-start attribute is set to true.
	 * Should be called by another function to start the chart.
	 *
	 * Expects a copy of the engine to be saved to this element.
	 */
	startChart(engine, feed, behavior) {
		console.log('startChart method');
		this.configureDataSource(engine, feed, behavior);
		this.configureMarkets(engine);
		this.configureAddOns(engine);
		this.startUI();
	}

	/**
	 * Overwrite me to extend and attach your own quoteFeed.
	 * This function should call CIQ.ChartEngine#attachQuoteFeed with the quoteFeed you wish to use or start streaming your data.
	 */
	configureDataSource(engine, feed, behavior) {
		if (engine && feed) engine.attachQuoteFeed(feed, behavior);
		else this.stxx.attachQuoteFeed(window.quoteFeedSimulator, {refreshInterval: 1});
	}

	/**
	 * Overwrite me to extend and start your own custom chart UI here.
	 * Called by the connectedCallback so you are garuenteed to have access to the DOM. Initialize anything you need for your UI here.
	 */
	startUI() {
		this.setHeight();
		this.startComponentUI();
	}

	/**
	 * Overwrite me to set up your chart with custom market classes.
	 */
	configureMarkets() {
		this.stxx.setMarketFactory(CIQ.Market.Symbology.factory);
	}

	configureAddOns() {
		if (CIQ.RangeSlider) {
			new CIQ.RangeSlider({stx: this.stxx});
		}
		if (CIQ.Animation && window.SplinePlotter.loaded) {
			new CIQ.Animation(this.stxx, {tension:0.3});
		}
		if (CIQ.ExtendedHours) {
			new CIQ.ExtendedHours({stx: this.stxx, filter: true});
		}
		if (CIQ.InactivityTimer) {
			this.inactivityTimer = new CIQ.InactivityTimer({stx: this.stxx, minutes: 30});
		}
		if (CIQ.Tooltip) {
			new CIQ.Tooltip({stx: this.stxx, ohl: true, volume: true, series: true, studies: true});
		}
	}

	startComponentUI() {
		var stxx = this.stxx;
		var UIContext= CIQ.UI.getMyContext(stxx.container);
		if (!UIContext) {

		}
		UIContext.stx = this.stxx;
		console.log('UIContext: '+this.UIContext);

		console.log('setting up CIQ.UI.StudyEdit for callbacks...');
		var UIStudyEdit=new CIQ.UI.StudyEdit(null, UIContext);

		var KeystrokeHub=new CIQ.UI.KeystrokeHub($$$("body"), UIContext, {cb:CIQ.UI.KeystrokeHub.defaultHotKeys});

		if(UIContext.loader) UIContext.loader.show();
		if(CIQ.I18N.wordlists) CIQ.I18N.localize(stxx, stxx.preferences.language);

		this.restoreLayout(stxx, function(){
			if(UIContext.loader) UIContext.loader.hide();
		});
		this.restorePreferences(stxx);

		stxx.addEventListener('layout', this.saveLayout);
		stxx.addEventListener('symbolChange', this.saveLayout);
		stxx.addEventListener('preferences', this.savePreferences);
	}

	restoreLayout(stx, cb){
		var datum=CIQ.localStorage.getItem("myChartLayout");
		if(datum===null) return;
		stx.importLayout(JSON.parse(datum), {managePeriodicity:true, cb: cb});
	}

	saveLayout(obj){
		var s=JSON.stringify(obj.stx.exportLayout(true));
		CIQ.localStorageSetItem("myChartLayout", s);
	}

	restorePreferences(stx){
		var pref=CIQ.localStorage.getItem("myChartPreferences");
		if (pref) stx.importPreferences(JSON.parse(pref));
	}

	savePreferences(obj){
		CIQ.localStorageSetItem("myChartPreferences",JSON.stringify(obj.stx.exportPreferences()));
	}

	retoggleEvents(obj){
		var active=$$$(".stx-markers .ciq-radio.ciq-active");
		active.parent().triggerHandler("stxtap");
	}

	showMarkers(type){
		this.hideMarkers();
		this.createSampleEvents(type);
		this.stxx.draw();
	}

	hideMarkers(){
		CIQ.Marker.removeByLabel(this.stxx, "circle");
		CIQ.Marker.removeByLabel(this.stxx, "square");
		CIQ.Marker.removeByLabel(this.stxx, "callout");
		CIQ.Marker.removeByLabel(this.stxx, "helicopter");
	}

	createSampleEvents(standardType) {
		let stxx = this.stxx;
		var l=stxx.masterData.length;
		// An example of a data array to drive the marker creation
		var data=[];
		if(l>=5) data.push({x:stxx.masterData[l-5].DT, type:standardType, category:"news", headline:"This is a Marker for a News Item"});
		if(l>=15) data.push({x:stxx.masterData[l-15].DT, type:standardType, category:"earningsUp", headline:"This is a Marker for Earnings (+)"});
		if(l>=25) data.push({x:stxx.masterData[l-25].DT, type:standardType, category:"earningsDown", headline:"This is a Marker for Earnings (-)"});
		if(l>=35) data.push({x:stxx.masterData[l-35].DT, type:standardType, category:"dividend", headline:"This is a Marker for Dividends"});
		if(l>=45) data.push({x:stxx.masterData[l-45].DT, type:standardType, category:"filing", headline:"This is a Marker for a Filing"});
		if(l>=55) data.push({x:stxx.masterData[l-55].DT, type:standardType, category:"split", headline:"This is a Marker for a Split"});

		var story="Like all ChartIQ markers, the object itself is managed by the chart, so when you scroll the chart the object moves with you. It is also destroyed automatically for you when the symbol is changed.";

		// Loop through the data and create markers
		for(var i=0;i<data.length;i++){
			var datum=data[i];
			datum.story=story;
			var params={
				stx:stxx,
				label:standardType,
				xPositioner:"date",
				x: datum.x,
				//chartContainer: true, // Allow markers to float out of chart. Set css .stx-marker{ z-index:20}
				node: new CIQ.Marker.Simple(datum)
			};

			var marker=new CIQ.Marker(params);
		}
	}

	setHeight() {
		console.log('setting contianer height...');
		var windowHeight=window.innerHeight;
		var ciqHeight = $$$('.ciq-chart').clientHeight;

		if (this.drawingToolbar) {
			this.style.height = (ciqHeight - 45)+"px";
		} else {
			this.style.height = ciqHeight+"px";
		}
	    // This little snippet will ensure that dialog boxes are never larger than the screen height
		// $('#maxHeightCSS').remove();
		// $('head').append('<style id="maxHeightCSS">cq-dialog { max-height: ' +  windowHeight + 'px }</style>');
	}
}

	CIQ.UI.ChartIQChart=customElements.define('chartiq-chart', ChartIQChart);

	return _exports;
});
