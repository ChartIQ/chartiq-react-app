import React from 'react';

import OrderBook from '../Plugins/CryptoIQ/OrderBook';
import ToggleOrderBook from '../Plugins/CryptoIQ/ToggleOrderBook';

export default class Plugins extends React.Component {
	render() {
		const cryptoiq = this.props.cryptoiq;
		return (
			<React.Fragment>
				{cryptoiq && cryptoiq.orderBook && cryptoiq.orderBook.addToChart && (
					<>
						<OrderBook {...cryptoiq.orderBook} />
						<ToggleOrderBook {...cryptoiq.orderBook} />
					</>
				)}
			</React.Fragment>
		);
	}
}
