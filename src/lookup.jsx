import React from 'react'
import 'example-feeds/symbolLookupChartIQ'
import { Lookup, Menu, Scroll } from 'components'
import { ChartContext } from './react-chart-context'

export default class ChartLookup extends React.Component {

	componentDidMount() {
		console.log('ChartLookup mounted')
		console.log(this.context)
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

			console.log('ChartLookup just found the UIContext')
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
	}


	render() {
		return (

<React.Fragment>
	<cq-menu class="ciq-search">
		<cq-lookup cq-keystroke-claim cq-keystroke-default>
			<cq-lookup-input cq-no-close>
				<input type="text" spellCheck="off" autoComplete="off" autoCorrect="off" autoCapitalize="off" name="symbol" placeholder="Enter Symbol" />
				<cq-lookup-icon></cq-lookup-icon>
			</cq-lookup-input>
			<cq-lookup-results>
				<cq-scroll></cq-scroll>
			</cq-lookup-results>
		</cq-lookup>
	</cq-menu>
</React.Fragment>

		)
	}
}

ChartLookup.contextType = ChartContext
