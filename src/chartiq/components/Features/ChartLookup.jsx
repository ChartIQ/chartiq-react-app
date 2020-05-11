import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import 'chartiq/examples/feeds/symbolLookupChartIQ'; // adds CIQ.ChartEngine.Driver.Lookup.ChartIQ constructor
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart lookup component
 *
 * UI widget which provides search box to select active chart symbol
 *
 * Note, a {@link CIQ.ChartEngine.Driver.Lookup} must be provided.
 * If none is provided then the default will be used which displays no results.
 *
 * Use [CIQ.UI.Context.setLookupDriver](CIQ.UI.Context.html#setLookupDriver) to link the dirver to the [cq-lookup web component]{@link WebComponents.cq-lookup}
 *
 * To turn off the result window modify CSS  to `.stxMenuActive cq-lookup cq-menu { opacity: 0 }`
 *
 * @export
 * @class ChartLookup
 * @extends {React.Component}
 */
export default class ChartLookup extends React.Component {
	constructor() {
		super();
		this.symbolInputRef = React.createRef();
		this.lookupRef = React.createRef();
	}

	componentDidMount() {
		const {
			UIContext,
			UIContext: { stx },
			config: { defaultSymbol, symbolLookupTabs = ['ALL'] }
		} = this.context;

		UIContext.changeSymbol = function(data) {
			if (this.loader) this.loader.show();
			data.symbol = data.symbol.toUpperCase(); // set a pretty display version

			var self = this;
			stx.newChart(data, null, null, function(err) {
				if (self.loader) self.loader.hide();
			});
		};

		UIContext.setLookupDriver(new CIQ.ChartEngine.Driver.Lookup.ChartIQ());
		UIContext.UISymbolLookup = this.lookupRef.current;
		UIContext.UISymbolLookup.setCallback(function(context, data) {
			context.changeSymbol(data);
		});

		if (!stx.chart.symbol) {
			UIContext.UISymbolLookup.selectItem({ symbol: defaultSymbol }); // load an initial symbol
		}

		this.tabItems = symbolLookupTabs.map((name, index) => {
			return index ? (
				<cq-filter class="true" key={name}>
					{name}
				</cq-filter>
			) : (
				<cq-filter key={name}>{name}</cq-filter>
			);
		});
	}

	render() {
		const {
			UIContext: { uiLayout: { symbolPlaceholder = 'Enter Symbol' } = {} }
		} = this.context;

		return (
			<React.Fragment>
				<cq-menu class="ciq-search">
					<cq-lookup
						cq-keystroke-claim
						cq-keystroke-default
						ref={this.lookupRef}
					>
						<cq-lookup-input cq-no-close>
							<input
								type="text"
								spellCheck="off"
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								name="symbol"
								placeholder={symbolPlaceholder}
								ref={this.symbolInput}
							/>
							<cq-lookup-icon></cq-lookup-icon>
						</cq-lookup-input>
						<cq-lookup-results>
							<cq-lookup-filters cq-no-close>{this.tabItems}</cq-lookup-filters>
							<cq-scroll></cq-scroll>
						</cq-lookup-results>
					</cq-lookup>
				</cq-menu>
			</React.Fragment>
		);
	}
}

ChartLookup.contextType = ChartContext;
