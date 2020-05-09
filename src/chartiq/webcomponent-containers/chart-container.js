import { CIQ } from 'chartiq/js/componentUI';

/**
 * Chart setup web component `<chartiq-chart-container>`.
 */
class ChartIQChartContainer extends HTMLElement {
	disconnectedCallback() {
		this.stx.destroy();
	}

	startChartUI({
		stx,
		quoteFeed,
		quoteFeedBehavior = {},
		addOns,
		marketFactory
	}) {
		if (!stx)
			throw new Error(
				'CIQ.ChartEngine has not been created!\nCheck that you have passed an chartiq engine into this function.'
			);
		this.stx = stx;
		if (quoteFeed) {
			stx.attachQuoteFeed(quoteFeed, quoteFeedBehavior);
		}
		if (marketFactory) {
			stx.setMarketFactory(marketFactory);
		}
		this.configureAddOns(addOns);
		this.startComponentUI(stx);
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
							console.log(
								`Plugin ${addOnObjectName} not availble for ${addOn} with params:`,
								params
							);
						}
						return;
					}
					new CIQ[addOnObjectName]({
						stx,
						...(typeof params === 'object' ? params : {})
					});
				} catch (err) {
					if (CIQ.debug) {
						console.error(
							'Error configuring ' + addOn + ' using params ',
							params,
							'error',
							err
						);
					}
				}
			});
	}

	startComponentUI(stx) {
		let UIContext = CIQ.UI.getMyContext(stx.container);
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

		new CIQ.UI.KeystrokeHub(document.body, UIContext, {
			cb: CIQ.UI.KeystrokeHub.defaultHotKeys
		});

		this.setHeight();

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
			return start.querySelector('cq-context, [cq-context]');
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

	setHeight() {
		const {
			parentElement: { clientHeight: height }
		} = this;

		this.style.height = height + 'px';
		this.style.height = height - (this.drawingToolbar ? 45 : 0) + 'px';
	}

	get drawingToolbar() {
		return JSON.parse(this.getAttribute('toolbar-active'));
	}
}

CIQ.UI.ChartIQChartContainer = ChartIQChartContainer;
customElements.define('chartiq-chart-container', ChartIQChartContainer);
