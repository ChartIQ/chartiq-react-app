import React from 'react'
import 'feeds/symbolLookupChartIQ'
import { Lookup, Menu, Scroll } from 'components'
import { ChartContext } from '../../react-chart-context'

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
		super()
		this.symbolInput = React.createRef();
	}

	componentDidMount() {
		let UIContext = this.context.UIContext
		let stx = UIContext.stx
		if (UIContext && stx) {
			UIContext.changeSymbol=function(data){
				if(this.loader) this.loader.show();
				data.symbol=data.symbol.toUpperCase(); // set a pretty display version

				var self=this;
				stx.newChart(data, null, null, function(err){
					if(self.loader) self.loader.hide();
				});
			};

			UIContext.setLookupDriver(new CIQ.ChartEngine.Driver.Lookup.ChartIQ());
			UIContext.UISymbolLookup=$$$(".ciq-nav cq-lookup");
			UIContext.UISymbolLookup.setCallback(function(context, data){
				context.changeSymbol(data);
			});

			if(!stx.chart.symbol) {
				UIContext.UISymbolLookup.selectItem({symbol:"AAPL"}); // load an initial symbol
			}

			this.context.setContext({UIContext: UIContext})
		}

		window.addEventListener("resize", this.resizeScreen.bind(this));
		this.resizeScreen();
	}

	resizeScreen(){
		let containerWidth = document.querySelector('.cq-chart-container').offsetWidth;

		if (containerWidth> 700) {
			this.symbolInput.current.placeholder = "Enter Symbol";
		}else if (containerWidth <= 700 && containerWidth > 584) {
			this.symbolInput.current.placeholder = "Symbol";
		}else if (containerWidth <= 584) {
			this.symbolInput.current.placeholder = "";
		}
	}


	render() {
		return (

<React.Fragment>
	<cq-menu class="ciq-search">
		<cq-lookup cq-keystroke-claim cq-keystroke-default>
			<cq-lookup-input cq-no-close>
				<input id="symbol" type="text" spellCheck="off" autoComplete="off" autoCorrect="off" autoCapitalize="off" name="symbol" placeholder="Enter Symbol" ref={this.symbolInput} />
				<cq-lookup-icon></cq-lookup-icon>
			</cq-lookup-input>
			<cq-lookup-results>
				<cq-lookup-filters cq-no-close>
					<cq-filter class="true">ALL</cq-filter>
					<cq-filter>STOCKS</cq-filter>
					<cq-filter>FX</cq-filter>
					<cq-filter>INDEXES</cq-filter>
					<cq-filter>FUNDS</cq-filter>
					<cq-filter>FUTURES</cq-filter>
				</cq-lookup-filters>
				<cq-scroll></cq-scroll>
			</cq-lookup-results>
		</cq-lookup>
	</cq-menu>
</React.Fragment>

		)
	}
}

ChartLookup.contextType = ChartContext
