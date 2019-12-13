import React from 'react'
import { CIQ } from 'chartiq/js/chartiq';

import { ChartContext } from '../../context/ChartContext';

import OrderBook from '../Plugins/CryptoIQ/OrderBook';
import ToggleOrderBook from '../Plugins/CryptoIQ/ToggleOrderBook';

export default class Plugins extends React.Component {
	render() {
		const { pluginsInstalled = {} } = this.context;
		const { cryptoiq } = this.props;

		return (
			<React.Fragment>
				{cryptoiq 
					&& cryptoiq.orderBook 
					&& cryptoiq.orderBook.addToChart 
					&& pluginsInstalled.cryptoiq
					&& (<>
						<OrderBook {...cryptoiq.orderBook} />
						<ToggleOrderBook {...cryptoiq.orderBook} />
					</>)
				}
			</React.Fragment>
		);
	}
}

Plugins.contextType = ChartContext;
